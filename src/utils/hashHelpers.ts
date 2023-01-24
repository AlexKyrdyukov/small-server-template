import CryptoJS from 'crypto-js';

import config from '../config';

const hashPassword = (password: string) => {
  return CryptoJS[config.hash.algorithm](password, config.hash.salt).toString();
};

const checkPassword = (password: string, hashPassword: string) => {
  return CryptoJS[config.hash.algorithm](password, config.hash.salt).toString() === hashPassword;
};

export default {
  hashPassword,
  checkPassword,
};
