import axios from 'axios';
import OpenAI from 'openai'
import fs from 'fs';

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const transcribe = async (filepath: any) => {
  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream(filepath),
    model: "whisper-1",
  });

  return transcription.text
}
