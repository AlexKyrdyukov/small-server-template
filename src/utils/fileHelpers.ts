import fs from 'fs';
import { randomUUID } from 'crypto';

import logger from './logger';
import config from '../config';

const BASE_PATH = 'public/uploads';

const directories = {
  avatars: `${BASE_PATH}/userAvatars`,
  bookCovers: `${BASE_PATH}/bookCovers`,
};

const removeImage = async (fileUrl: string, dirName: keyof typeof directories) => {
  try {
    const fileName = fileUrl.split('/').at(-1);
    await fs.promises.unlink(`${directories[dirName]}/${fileName}`);
  } catch (error) {
    logger.error(error);
  }
};

const getUrlImage = (image: string, path: string) => {
  return `${config.server.imageUrl}${path}/${image}`;
};

const createFileName = (meta: string) => {
  const extension = getExtension(meta);
  return `${randomUUID()}.${extension}`;
};

const writeImage = async (
  file: Buffer,
  dirName: keyof typeof directories,
  fileName: string,
) => {
  const fileUrl = `${directories[dirName]}/${fileName}`;
  await fs.promises.writeFile(fileUrl, file);
};

const convertBase64ToBuffer = (image: string) => {
  return Buffer.from(image, 'base64');
};

const getExtension = (meta: string) => {
  const extensions = ['svg', 'png', 'jpeg', 'jpg'];
  const extension = extensions.filter((item) => meta.includes(item));
  return extension.join();
};

export default {
  removeImage,
  writeImage,
  getUrlImage,
  convertBase64ToBuffer,
  createFileName,
};
