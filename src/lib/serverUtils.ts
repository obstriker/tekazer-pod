"use server"
import https from 'https';
import fs from 'fs';

export const downloadFile = async (url: string, destinationPath: string) => {
    const file = fs.createWriteStream(destinationPath);
    const request = https.get(url, (response) => {
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