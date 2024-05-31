import OpenAI from 'openai'
import fs from 'fs';
import { OpenAIWhisperAudio } from 'langchain/document_loaders/fs/openai_whisper_audio';

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const transcribeText = async (filePath: any) => {
  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream(filePath),
    model: "whisper-1",
  });

  return transcription.text
}

export const transcribeDocs = async (filePath: any) => {
  // Add restrictions if the file is longer than 30 minutes
  // File can be maximum 30 minutes for free subscription and 120 minutes to pro subscription
  
  const loader = new OpenAIWhisperAudio(filePath);
  const docs = await loader.load();

  return docs
}