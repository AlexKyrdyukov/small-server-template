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
    const fileName = getFileName(fileUrl);

    if (fileName) {
      await fs.promises.unlink(`${directories[dirName]}/${fileName}`);
    }
  } catch (error) {
    logger.error(error);
  }
};

const getFileName = (fileUrl: string) => {
  const fileName = fileUrl.split('/').at(-1);

  if (fileName === 'null') {
    return false;
  }

  return fileName;
};

const getUrlImage = (image: string, path: string) => {
  return `${config.server.imageUrl}${path}/${image}`;
};

const writeImage = async (
  fileName: string,
  dirName: keyof typeof directories,
  oldImage?: string,
) => {
  if (oldImage) {
    await removeImage(oldImage, dirName);
  }

  const [meta, image] = fileName.split(',');
  const avatarName = `${randomUUID()}.${getExtension(meta)}`;
  const fileUrl = `${directories[dirName]}/${avatarName}`;

  await fs.promises.writeFile(fileUrl, convertBase64(image));
  return avatarName;
};

const convertBase64 = (image: string) => {
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
  getFileName,
};
