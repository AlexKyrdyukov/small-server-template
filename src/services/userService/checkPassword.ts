import CryptoJS from 'crypto-js';
import { errorTypes } from '../../utils';
import { Exception } from '../../services';

import config from '../../config';

const checkPassword = (newPassword: string, oldPassword: string) => {
  const verification = CryptoJS[config.hash.algorithm](
    newPassword,
    config.hash.salt,
  ).toString() === oldPassword;
  if (!verification) {
    throw Exception.createError(errorTypes.BAD_REQUEST_INVALID_PASSWORD);
  }
};

export default checkPassword;
