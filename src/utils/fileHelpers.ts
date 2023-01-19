import fs from 'fs';

import { randomUUID } from 'crypto';
import { Logger } from '../utils';

const directory = 'public/uploads/userAvatars/';

const remove = (pathFile: string) => {
  const arrayPath = pathFile.split('/');

  const nameFile = arrayPath[arrayPath.length - 1];

  if (nameFile === 'null') {
    return;
  }
  fs.unlink(`${directory}/${nameFile}`, (err) => {
    if (err) {
      Logger.error(err);
    }
  });
};

const convertImage = (image: string) => {
  return Buffer.from(image, 'base64');
};

const getExtension = (meta: string) => {
  const currentInfo = meta.split('/')[1];
  const index = currentInfo.match(/\W/).index;
  return currentInfo.slice(0, index);
};

const write = (file: string) => {
  const [meta, image] = file.split(',');

  const avatarName = `${randomUUID()}.${getExtension(meta)}`;
  const fileUrl = `${directory}${avatarName}`;
  fs.writeFile(fileUrl, convertImage(image), (err) => {
    if (err) {
      Logger.error(err);
    }
  });
  return avatarName;
};

export default {
  remove,
  write,
};
