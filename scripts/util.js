import { fileURLToPath } from "url";
import fsPromise from "fs/promises";
import path from "path";

const originalDirName = "image-files";

export default async function getFiles() {
  try {
    const currentDir = fileURLToPath(import.meta.url);
    const dirPath = path.join(currentDir, "../", originalDirName);
    const dirFiles = await fsPromise.readdir(dirPath);

    const fileBuffer = [];

    for (const filePath of dirFiles) {
      const file = await fsPromise.readFile(path.join(dirPath, filePath));
      fileBuffer.push({ path: filePath, buffer: file });
    }

    return fileBuffer;
  } catch (error) {
    throw error;
  }
}
