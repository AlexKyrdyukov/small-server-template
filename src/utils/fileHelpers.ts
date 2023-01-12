import fs from 'fs';
import { randomUUID } from 'crypto';

const directory = 'public/static';

const remove = () => {
  fs.readdir(directory, (err, files) => {
    if (err) console.error(err);
    if (!files.length) {
      return;
    }
    for (const file of files) {
      fs.unlink(`${directory}/${file}`, (err) => {
        if (err) console.error(err);
      });
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
