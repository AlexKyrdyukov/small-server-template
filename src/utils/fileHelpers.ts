import fs from 'fs';
import { randomUUID } from 'crypto';

const remove = () => {
  fs.readdir('public/static', (err, files) => {
    if (err) console.error(err);

    for (const file of files) {
      fs.unlink(`public/static/${file}`, (err) => {
        if (err) console.error(err);
      });
    }
  });
};

const write = (file: string) => {
  const convertFile = Buffer.from(file.split(',')[1], 'base64');
  const avatarName = `${randomUUID()}.svg`;

  fs.writeFileSync(`public/static/${avatarName}`, convertFile);

  return avatarName;
};

export default {
  remove,
  write,
};
