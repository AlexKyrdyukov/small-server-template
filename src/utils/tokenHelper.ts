import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

import CustomError from './CustomError';
import errorText from './errorMessages';
import config from '../config';

const create = async (id: number) => {
  // const signetToken = await new Promise<string>((resolve, reject) => {
  //   jwt.sign({}, '', {}, (err, data) => {
  //     if (err) {
  //       return reject(err);
  //     }

  //     resolve(data);
  //   });
  // });

  return jwt.sign({ id }, config.token.secret, { algorithm: 'HS512', expiresIn: '1h' });
};

const decode = (token: string) => {
  try {
    const payload = jwt.verify(token, config.token.secret) as { id: number };
    return payload;
  } catch {
    throw new CustomError(StatusCodes.FORBIDDEN, errorText.USER_SIGN_IN);
  }
};

export default {
  create,
  decode,
};
