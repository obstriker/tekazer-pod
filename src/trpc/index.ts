import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import {
  privateProcedure,
  publicProcedure,
  router,
} from './trpc'
import { TRPCError, createCallerFactory } from '@trpc/server'
import { db } from '@/db'
import { z } from 'zod'
import { INFINITE_QUERY_LIMIT } from '@/config/infinite-query'
import { cleanUpLocalFile, downloadFileAndSaveToDb, fileExists } from '@/lib/serverUtils'
import {absoluteUrl} from '@/lib/utils'
import {
  getUserSubscriptionPlan,
  stripe,
} from '@/lib/stripe'
import { PLANS } from '@/config/stripe'
import { UploadStatus } from '@prisma/client'
import { transcribe, transcribeDocs } from '@/lib/openai'
import { PDFLoader } from 'langchain/document_loaders/fs/pdf'
import { createAndStoreEmbeddings} from '@/app/api/uploadthing/core'

const EpisodeSchema = z.object({
  id: z.string(),
  title: z.string(),
  audioUrl: z.string(),
  image: z.string().optional(),
  description: z.string().optional(),
});


const FileSchema = z.object({
  id: z.string(),
  userId: z.string(),
  fileUrl: z.string().optional(),
  transcription: z.string().optional(),
});

const updateFile = async ({ ctx, input } : { ctx: any, input: any }) => {
  const { userId } = ctx;
  const { id, ...restOfInput } = input;

  const updatedFile = await db.file.update({
    where: {
      id: id,
      userId,
    },
    data: restOfInput,
  });

  return updatedFile;
};


const setFileUploadStatus = async ({ ctx, input } : { ctx: any, input: { key: string, status: UploadStatus } }) => {
  const { userId } = ctx;
  const { key, status } = input;

  const file = await db.file.findFirst({
    where: {
      key: key,
      userId,
    },
  });

  if (!file) {
    throw new TRPCError({ code: 'NOT_FOUND' });
  }

  await db.file.update({
    where: {
      id: file.id, // should update by file ID, not key
    },
    data: {
      uploadStatus: status,
    },
  });

  return { key, status };
}

export const appRouter = router({
  test: publicProcedure.query(async () => {

    return { success: true }
  }),
  
  authCallback: publicProcedure.query(async () => {
    const { getUser } = getKindeServerSession()
    const user = getUser()

    if (!user.id || !user.email)
      throw new TRPCError({ code: 'UNAUTHORIZED' })

    // check if the user is in the database
    const dbUser = await db.user.findFirst({
      where: {
        id: user.id,
      },
    })

    if (!dbUser) {
      // create user in db
      await db.user.create({
        data: {
          id: user.id,
          email: user.email,
        },
      })
    }

    return { success: true }
  }),
  getUserFiles: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx

    return await db.file.findMany({
      where: {
        userId,
      },
    })
  }),

  createStripeSession: privateProcedure.mutation(
    async ({ ctx }) => {
      const { userId } = ctx

      const billingUrl = absoluteUrl('/dashboard/billing')

      if (!userId)
        throw new TRPCError({ code: 'UNAUTHORIZED' })

      const dbUser = await db.user.findFirst({
        where: {
          id: userId,
        },
      })

      if (!dbUser)
        throw new TRPCError({ code: 'UNAUTHORIZED' })

      const subscriptionPlan =
        await getUserSubscriptionPlan()

      if (
        subscriptionPlan.isSubscribed &&
        dbUser.stripeCustomerId
      ) {
        const stripeSession =
          await stripe.billingPortal.sessions.create({
            customer: dbUser.stripeCustomerId,
            return_url: billingUrl,
          })

        return { url: stripeSession.url }
      }

      const stripeSession =
        await stripe.checkout.sessions.create({
          success_url: billingUrl,
          cancel_url: billingUrl,
          payment_method_types: ['card', 'paypal'],
          mode: 'subscription',
          billing_address_collection: 'auto',
          line_items: [
            {
              price: PLANS.find(
                (plan) => plan.name === 'Pro'
              )?.price.priceIds.test,
              quantity: 1,
            },
          ],
          metadata: {
            userId: userId,
          },
        })

      return { url: stripeSession.url }
    }
  ),

  getFileMessages: privateProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
        fileId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { userId } = ctx
      const { fileId, cursor } = input
      const limit = input.limit ?? INFINITE_QUERY_LIMIT

      const file = await db.file.findFirst({
        where: {
          id: fileId,
          userId,
        },
      })

      if (!file) throw new TRPCError({ code: 'NOT_FOUND' })

      const messages = await db.message.findMany({
        take: limit + 1,
        where: {
          fileId,
        },
        orderBy: {
          createdAt: 'desc',
        },
        cursor: cursor ? { id: cursor } : undefined,
        select: {
          id: true,
          isUserMessage: true,
          createdAt: true,
          text: true,
        },
      })

      let nextCursor: typeof cursor | undefined = undefined
      if (messages.length > limit) {
        const nextItem = messages.pop()
        nextCursor = nextItem?.id
      }

      return {
        messages,
        nextCursor,
      }
    }),

  getFileUploadStatus: privateProcedure
    .input(z.object({ fileId: z.string() }))
    .query(async ({ input, ctx }) => {
      const file = await db.file.findFirst({
        where: {
          id: input.fileId,
          userId: ctx.userId,
        },
      })

      if (!file) return { status: 'PENDING' as const }

      return { status: file.uploadStatus }
    }),

  getFile: privateProcedure
    .input(z.object({ key: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx

      const file = await db.file.findFirst({
        where: {
          key: input.key,
          userId,
        },
      })

      if (!file) throw new TRPCError({ code: 'NOT_FOUND' })

      return file
    }),

  deleteFile: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx

      const file = await db.file.findFirst({
        where: {
          id: input.id,
          userId,
        },
      })

      if (!file) throw new TRPCError({ code: 'NOT_FOUND' })

      await db.file.delete({
        where: {
          id: input.id,
        },
      })

      return file
    }),

  updateFile: privateProcedure
  .input(FileSchema)
  .mutation(async ({ ctx, input }) => {
    return await updateFile({ctx, input})
  }),

  setFileUploadStatus: privateProcedure
    .input(z.object({
      key: z.string(),
      status: z.nativeEnum(UploadStatus),
    }))
    .mutation(async ({ ctx, input }) => {
      return await setFileUploadStatus({ctx, input})
    }),

  generatePodcastInsights: privateProcedure
    .input(z.object({ episode: EpisodeSchema }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      if (!userId) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      const generatePodcastInsights = async () => {
        const fileData = {
          name: input.episode.title,
          key: input.episode.audioUrl,
          url: input.episode.audioUrl,
          userId,
          uploadStatus: UploadStatus.PENDING,
          thumbnail: input.episode.image || "",
        };
        
        var localFilePath = "";

        //delete: test data
        fileData.url = "http://localhost:8000/Downloads/espn.m4a"

        //Remove all unnessesary loggings
        //export as much code to external function to make this clean and readble code
        try {
          console.log(`Downloading file ${fileData.url}...`)
          const { localFilePath, file } = await downloadFileAndSaveToDb(fileData);
          console.log(`Downloaded file saved to ${localFilePath}`)
          var transcription;

          if (!fileExists(localFilePath)) {
            console.log(`Failed to download file ${fileData.url}`)
            setFileUploadStatus({ctx, input: {key: fileData.key, status: UploadStatus.FAILED}})
            return false;
          }
          else {
            console.log(`Successfully downloaded file ${fileData.url}`)
            setFileUploadStatus({ctx, input: {key: fileData.key, status: UploadStatus.SUCCESS}})
            updateFile({ctx, input:file})

            console.log(`Transcribing file ${localFilePath}...`)
            transcription = await transcribeDocs(localFilePath);
            console.log(`Transcription result: ${JSON.stringify(transcription, null, 2)}`)
            await createAndStoreEmbeddings(transcription, file.id)
            
            console.log(`Transcribed file ${localFilePath}`)
            const transcriptionText = Array.from(transcription).map(doc => doc.pageContent).join(' ')

            console.log(`Transcription result: ${JSON.stringify(transcriptionText, null, 2)}`)
            console.log(`Updating file ${file.id} with transcription...`)
            await db.file.update({
              where: {
                id: file.id,
              },
              data: {
                transcription: transcriptionText,
              },
            });
            console.log(`Updated file ${file.id} with transcription`)

          }

          return transcription;

        } catch (err) {
          console.error(`Error processing file ${fileData.url}:`, err);
          setFileUploadStatus({ctx, input: {key: fileData.key, status: UploadStatus.FAILED}})
          throw err;
        } finally {
          await cleanUpLocalFile(localFilePath);
        }
      };

      return await generatePodcastInsights();
    }),

})

export type AppRouter = typeof appRouter
