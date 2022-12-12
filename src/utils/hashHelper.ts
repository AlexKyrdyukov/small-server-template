import CryptoJS from 'crypto-js';
import config from '../config';

const hashPassword = (password: string) => {
  return CryptoJS.HmacSHA512(password, config.hash.salt).toString();
};

const checkPassword = (password: string, hash: string) => {
  return CryptoJS.HmacSHA512(password, config.hash.salt).toString() === hash;
};

export default {
  hashPassword,
  checkPassword,
};
