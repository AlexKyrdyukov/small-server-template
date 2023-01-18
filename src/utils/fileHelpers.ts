import fs from 'fs';
import { randomUUID } from 'crypto';

const directory = 'public/static/userAvatar';

const remove = (pathFile: string) => {
  fs.unlink(pathFile, (err) => {
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
