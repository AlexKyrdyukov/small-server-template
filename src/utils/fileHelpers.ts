import fs from 'fs';
import { randomUUID } from 'crypto';

import config from '../config';

const BASE_PATH = 'public/uploads';

const directories = {
  avatars: `${BASE_PATH}/userAvatars`,
  bookCovers: `${BASE_PATH}/bookCovers`,
};

const removeImage = (fileName: string, dirName: keyof typeof directories) => {
  return fs.promises.unlink(`${directories[dirName]}/${fileName}`);
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

const writeImage = (fileName: string, dirName: keyof typeof directories) => {
  const [meta, image] = fileName.split(',');

  const avatarName = `${randomUUID()}.${getExtension(meta)}`;
  const fileUrl = `${directories[dirName]}/${avatarName}`;
  fs.promises.writeFile(fileUrl, convertBase64(image));
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
