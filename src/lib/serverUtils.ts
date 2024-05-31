import { Thumbnail } from 'react-pdf';
"use server"
import { v4 as uuid } from 'uuid';
import http from 'http';
import fs from 'fs';
import { db } from '@/db';
import { UploadStatus } from '@prisma/client';
import { transcribe } from './openai';

export const downloadFile = async (url: string, destinationPath: string) => {
    const file = fs.createWriteStream(destinationPath);
    // Add support for both http and https download
    const request = http.get(url, (response) => {
      response.pipe(file);
    });
    request.on('error', (err) => {
      fs.unlink(destinationPath, () => {}); // Delete temp file
      throw err;
    });
    request.on('close', async () => {
      file.close();
      const stats = fs.statSync(destinationPath);
      const fileSizeInBytes = stats.size;
      console.log(`File size in bytes: ${fileSizeInBytes}`);
      if (fileSizeInBytes > 50 * 1024 * 1024) { // 50MB
        fs.unlink(destinationPath, () => {}); // Delete temp file
        throw new Error(`File size is over 50MB, abort.`);
      }
    });
  };
  
  export const deleteFile = async (filePath: any) => {
    await new Promise<void>((resolve) => {
      fs.unlink(filePath, (error) => {
        if (error) {
          console.error(`Error deleting file ${filePath}:`, error);
        } else {
          console.log(`File ${filePath} deleted successfully.`);
        }
        resolve();
      });
    });
  };
  
  export const fileExists = (path: string): boolean => {
    try {
      fs.accessSync(path);
      return true;
    } catch {
      return false;
    }
  };

// generate insight helpers
  export async function downloadFileAndSaveToDb(fileData: {
    name: string;
    key: string;
    url: string;
    userId: string;
    uploadStatus: UploadStatus;
    thumbnail: string;
  }) {
    //Add convertion to mp3 or leave the audio in the same 
    const fileExtension = fileData.url.split(".").pop();
    if (!fileExtension) {
      throw new Error(`Cannot extract file extension from URL ${fileData.url}`);
    }
    const localFilePath = `/tmp/${uuid()}.${fileExtension}`;
    await downloadFile(fileData.url, localFilePath);
    const file = await db.file.create({ data: fileData });
    return {localFilePath, file}; 
  };
  
  export async function cleanUpLocalFile(localFilePath: string) {
    if (!localFilePath)
      {return false}

    if (await fileExists(localFilePath)) {
      await deleteFile(localFilePath);
    }
  };
