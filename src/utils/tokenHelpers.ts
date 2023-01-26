import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

import type { JwtPayload } from 'jsonwebtoken';

import { CustomError, errorMessages } from '../utils';

import config from '../config';

const create = async (id: number, expiresIn: string) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(
      { id },
      config.token.secret,
      {
        algorithm: config.token.algorithm,
        expiresIn,
      },
      (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      },
    );
  });
};

const decode = async (token: string) => {
  return new Promise<JwtPayload['id']>((resolve, reject) => {
    jwt.verify(
      token,
      config.token.secret,
      {
        algorithms: [config.token.algorithm],
      },
      (err, data) => {
        if (err) {
          return reject(
            new CustomError(StatusCodes.FORBIDDEN, errorMessages.USER_SIGN_IN),
          );
        }
        return resolve(data);
      },
    );
  });
};

export default {
  create,
  decode,
};
