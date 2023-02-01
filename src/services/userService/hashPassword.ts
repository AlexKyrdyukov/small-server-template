import CryptoJS from 'crypto-js';

import config from '../../config';

const hashPassword = (password: string) => {
  return CryptoJS[config.hash.algorithm](password, config.hash.salt).toString();
};

export default hashPassword;
