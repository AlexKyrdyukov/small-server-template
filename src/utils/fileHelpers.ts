import fs from 'fs';
import { randomUUID } from 'crypto';

const directory = 'public/uploads/userAvatars';

const remove = (pathFile: string) => {
  const arrayPath = pathFile.split('/');

  const nameFile = arrayPath[arrayPath.length - 1];

  if (nameFile === 'null') {
    return;
  }
  fs.unlink(`${directory}/${nameFile}`, (err) => {
    if (err) {
      console.error(err);
    }
  });
};

const write = (file: string) => {
  const convertFile = Buffer.from(file.split(',')[1], 'base64');
  const avatarName = `${randomUUID()}.svg`;

  fs.writeFileSync(`${directory}/${avatarName}`, convertFile);

  return avatarName;
};

export default {
  remove,
  write,
};
