import CryptoJS from 'crypto-js';
import { Exception } from '../../services';
import { errorTypes } from '../../utils';
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
