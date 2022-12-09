import CryptoJS from 'crypto-js';
import config from '../config';

// newUser.password = CryptoJS.SHA512(req.body.password + config.hash.salt).toString();

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
