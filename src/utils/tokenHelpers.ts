import jwt from 'jsonwebtoken';

import type { JwtPayload } from 'jsonwebtoken';
import { Exception } from '../services';

import { errorTypes } from '../utils';

import config from '../config';

type ErrorType = {
  message: string;
  status: number;
};

const create = async (id: number, expiresIn: string) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(
      { id },
      config.token.secret,
      {
        algorithm: config.token.algorithm,
        expiresIn,
      },
      (error, data) => {
        if (error) {
          return reject(error);
        }
        resolve(data);
      },
    );
  });
};

const decode = async (token: string, errorType: ErrorType) => {
  return new Promise<JwtPayload['id']>((resolve, reject) => {
    jwt.verify(
      token,
      config.token.secret,
      {
        algorithms: [config.token.algorithm],
      },
      (error, data) => {
        if (error) {
          if (error.message === 'jwt expired') {
            throw Exception.createError(errorType);
          }
          return reject(
            Exception.createError(errorTypes.UNAUTHORIZED_USER_LOG_IN),
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
