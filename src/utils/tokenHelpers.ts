import type { Algorithm, JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

import { CustomError, errorMessages } from '../utils';

import config from '../config';

const create = async (id: number) => {
  return new Promise<string>((resolve, reject) => {
    // eslint-disable-next-line max-len
    jwt.sign({ id }, config.token.secret, { algorithm: config.token.algorithm as Algorithm, expiresIn: config.token.accesLimit }, (err, data) => {
      if (err) {
        return reject(err);
      }
      // eslint-disable-next-line no-console
      console.log(data);
      resolve(data);
    });
  });

  // return jwt.sign(
  //   // eslint-disable-next-line max-len
  //   { id }, config.token.secret, '', {
  // algorithm: config.token.algorithm, expiresIn: config.token.accesLimit },
  // );
};

const decode = async (token: string) => {
  return new Promise<string | JwtPayload['id']>((resolve, reject) => {
    // eslint-disable-next-line max-len
    jwt.verify(token, config.token.secret, { algorithms: [config.token.algorithm] as Algorithm[] }, (err, data) => {
      // eslint-disable-next-line no-console
      console.log(err, data);
      if (err) {
        // eslint-disable-next-line no-console
        console.log(err);
        return reject(err);
      }
      // eslint-disable-next-line no-console
      console.log(data);
      return resolve(data);
    });
  });

  // try {
  //   const payload = jwt.verify(token, config.token.secret) as { id: number };
  //   return payload;
  // } catch {
  //   throw new CustomError(StatusCodes.FORBIDDEN, errorMessages.USER_SIGN_IN);
  // }
};

export default {
  create,
  decode,
};
