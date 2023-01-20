import CryptoJS from 'crypto-js';

import config from '../config';

type HmacHasherHelperType = {
  (message: string, key: string): string;
};

const hashMethods = [
  { HmacSHA512: CryptoJS.HmacSHA512 },
  { HmacSHA256: CryptoJS.HmacSHA256 },
  { HmacSHA384: CryptoJS.HmacSHA384 },
  { HmacSHA224: CryptoJS.HmacSHA224 },
  { SHA256: CryptoJS.SHA256 },
];

const selectAlgoritm = () => {
  for (let i = 0; i < hashMethods.length; i++) {
    const key = Object.keys(hashMethods[i]).join();
    const values = Object.values(hashMethods[i]);
    if (key === config.hash.passwordType) {
      return values[0];
    }
  }
};

const hashPassword = (password: string) => {
  const algoritm: HmacHasherHelperType = selectAlgoritm();
  return algoritm(password, config.hash.paswordSalt).toString();
};

const checkPassword = (password: string, hashPassword: string) => {
  const algoritm: HmacHasherHelperType = selectAlgoritm();
  return algoritm(password, config.hash.paswordSalt).toString() === hashPassword;
};

export default {
  hashPassword,
  checkPassword,
};
