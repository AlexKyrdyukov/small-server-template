import CryptoJS from 'crypto-js';
import config from '../config';

const hashPassword = (password: string) => {
  return CryptoJS.HmacSHA512(password, config.hash.paswordSalt).toString();
};

const checkPassword = (password: string, hash: string) => {
  return CryptoJS.HmacSHA512(password, config.hash.paswordSalt).toString() === hash;
};

export default {
  hashPassword,
  checkPassword,
};
