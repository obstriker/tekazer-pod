import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Link from 'next/link'
import Image from 'next/image'
import Pricing from '@/components/Pricing'
import FeatureSection from '@/components/FeatureSection'
import { Button, Typography } from '@mui/material'

export default function Home() {
  const items = [
    { text: 'Easy Uploads' },
    { text: 'Automatic Autofit' },
    // Add more items as needed
  ];
  return (
    <>
      <MaxWidthWrapper className='mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center md:mt-60'>
        <div className='mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50'>
          <p className='text-sm font-semibold text-gray-700'>
            Pod3 is now public!
          </p>
        </div>
        <h1 className='max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl'>
          <span className='bg-gradient-to-r from-indigo-600 to-pink-400 inline-block text-transparent bg-clip-text'>Summarize</span>{' '}
          your podcast and {' '} save time.
        </h1>
        <p className='mt-5 max-w-prose text-zinc-700 sm:text-lg'>
          Pod3 allows you to summarize, highlight and extract the most important information while saving you time listening to them.
        </p>

        <div className='w-full pt-5'>
            <Button className='coloredButton py-2 px-10'>
            <Typography sx={{ color: "White", fontFamily: "nova"}} fontWeight={500} variant="h6">
              Get started
            </Typography>
            </Button>
          </div>
          <div className="rounded-lg  px-20 py-10 bg-gradient-to-r from-indigo-600 to-red-600 mt-40">
              <div className="relative overflow-hidden rounded-lg border-neutral-800 border flex justify-center">
                <img alt="" src="http://localhost:3000/_next/image?url=%2Fdashboard-preview.jpg&w=1920&q=100" decoding="async" data-nimg="1" className="inline-block color-transparent" loading="lazy" />
              </div>
            </div>
      </MaxWidthWrapper>    

      <FeatureSection
            title="Branding"
            subtitle="Brand Your Landing Page"
            description="Your landing page should reflect the aesthetic, the design and the energy of the brand you've already created. With NextJs, you can customize the page's details to create a truly unique page that refines your look and feel. We make designing and launching easy, no matter what your product is."
            items={items}
            imageUrl="https://images.pexels.com/photos/5973959/pexels-photo-5973959.jpeg?auto=compress&cs=tinysrgb&w=600x"
            direction="right" />

      <FeatureSection
            title="Branding"
            subtitle="Brand Your Landing Page"
            description="Your landing page should reflect the aesthetic, the design and the energy of the brand you've already created. With NextJs, you can customize the page's details to create a truly unique page that refines your look and feel. We make designing and launching easy, no matter what your product is."
            items={items}
            imageUrl="https://images.pexels.com/photos/5973959/pexels-photo-5973959.jpeg?auto=compress&cs=tinysrgb&w=600x"
            direction="left" />

      <div className="h-[250px]"></div>
      {/* value proposition section */}
      <div>
        <div className='relative isolate'>
          
        <MaxWidthWrapper className='text-center items-center flex-col'>
          <div className="items-center flex justify-center">
            <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl font-['trend-sans']">
              Unlock insights <span className='text-green-600'>Instantly</span>
            </h1>
          </div>


          <div className='w-full justify-center items-center flex pt-[15rem]'>
            <div className="justify-center w-5/6">
            <div className="rounded-lg  px-20 py-10 bg-gradient-to-r from-indigo-600 to-red-600">
              <div className="relative overflow-hidden rounded-lg border-neutral-800 border flex justify-center">
                <img alt="" src="http://localhost:3000/_next/image?url=%2Fdashboard-preview.jpg&w=1920&q=100" decoding="async" data-nimg="1" className="inline-block color-transparent" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
        </MaxWidthWrapper>

        <br/><br/><br/><br/><br/><br/>
        <Pricing />
          <div
            aria-hidden='true'
            className='pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'>
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
            />
          </div>

          <div>
            <div className='mx-auto max-w-6xl px-6 lg:px-8'>
              <div className='mt-16 flow-root sm:mt-24'>
                <div className='-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
                  <Image
                    src='/dashboard-preview.jpg'
                    alt='product preview'
                    width={1364}
                    height={866}
                    quality={100}
                    className='rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10'
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            aria-hidden='true'
            className='pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'>
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className='relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]'
            />
          </div>
        </div>
      </div>

      {/* Feature section */}
      <div className='mx-auto mb-32 mt-32 max-w-5xl sm:mt-56'>
        <div className='mb-12 px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl sm:text-center'>
            <h2 className='mt-2 font-bold text-4xl text-gray-900 sm:text-5xl'>
              Start summarizing in minutes
            </h2>
            <p className='mt-4 text-lg text-gray-600'>
              summarizing your Media files has never been
              easier than with Pod3.
            </p>
          </div>
        </div>

        {/* steps */}
        <ol className='my-8 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0'>
          <li className='md:flex-1'>
            <div className='flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
              <span className='text-sm font-medium text-green-600'>
                Step 1
              </span>
              <span className='text-xl font-semibold'>
                Sign up for an account
              </span>
              <span className='mt-2 text-zinc-700'>
                Either starting out with a free plan or
                choose our{' '}
                <Link
                  href='/pricing'
                  className='text-green-700 underline underline-offset-2'>
                  pro plan
                </Link>
                .
              </span>
            </div>
          </li>
          <li className='md:flex-1'>
            <div className='flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
              <span className='text-sm font-medium text-green-600'>
                Step 2
              </span>
              <span className='text-xl font-semibold'>
                Upload your Media file
              </span>
              <span className='mt-2 text-zinc-700'>
                We&apos;ll process your file and make it
                ready for you to chat with.
              </span>
            </div>
          </li>
          <li className='md:flex-1'>
            <div className='flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
              <span className='text-sm font-medium text-green-600'>
                Step 3
              </span>
              <span className='text-xl font-semibold'>
                Start asking questions
              </span>
              <span className='mt-2 text-zinc-700'>
                It&apos;s that simple. Try out Pod3 today -
                it really takes less than a minute.
              </span>
            </div>
          </li>
        </ol>

        <div className='mx-auto max-w-6xl px-6 lg:px-8'>
          <div className='mt-16 flow-root sm:mt-24'>
            <div className='-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
              <Image
                src='/file-upload-preview.jpg'
                alt='uploading preview'
                width={1419}
                height={732}
                quality={100}
                className='rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10'
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
