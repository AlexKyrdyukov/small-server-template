import fs from 'fs';

import { randomUUID } from 'crypto';
import { Logger } from '../utils';
import config from '../config';

const directory = 'public/uploads/userAvatars/';

const remove = (pathFile: string) => {
  const arrayPath = pathFile.split('/');

  const nameFile = arrayPath[arrayPath.length - 1];

  if (nameFile === 'null') {
    return;
  }
  fs.unlink(`${directory}/${nameFile}`, (err) => {
    if (err) {
      Logger.info(err);
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
      Logger.info(err);
    }
  });
  return avatarName;
};

const getUrl = (image: string, path: string) => {
  return `${config.server.imageUrl}${path}/${image}`;
};

const checkNew = (dateIssue: string, createDate: Date) => {
  const flag = true;
  const data = new Date();
  if (dateIssue) {
    const [year, month, day] = dateIssue.split('-');
    const issueBook = new Date(+year, +month, +day);
    return flag && ((+data - +issueBook) < 267840000);
  }
  return flag && ((+data - +createDate) < 267840000);
};

export default {
  remove,
  write,
  getUrl,
  checkNew,
};
