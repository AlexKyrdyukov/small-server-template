import config from '../config';

const getFileUrl = (image: string, path: string) => {
  return `${config.server.imageUrl}/${path}/${image}`;
};

export default {
  getFileUrl,
};
