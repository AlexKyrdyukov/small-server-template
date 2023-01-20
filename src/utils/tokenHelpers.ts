import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

import type { Algorithm, JwtPayload } from 'jsonwebtoken';

import { CustomError, errorMessages, Logger } from '../utils';

import config from '../config';

const create = async (id: number) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(
      { id },
      config.token.secret,
      {
        algorithm: config.token.algorithm as Algorithm,
        expiresIn: config.token.accesLimit,
      },
      (err, data) => {
        if (err) {
          Logger.error(err);
          return reject(
            new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, config.server.internalErrorMessage),
          );
        }
        resolve(data);
      },
    );
  });
};

const decode = async (token: string) => {
  return new Promise<string | JwtPayload['id']>((resolve, reject) => {
    jwt.verify(
      token,
      config.token.secret,
      {
        algorithms: [config.token.algorithm] as Algorithm[],
      },
      (err, data) => {
        if (err) {
          Logger.error(err);
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
