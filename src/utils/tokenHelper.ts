/* eslint-disable no-console */
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

import CustomError from '../exceptions/CustomError';
import config from '../config';

const create = (id: number) => {
  return jwt.sign({ id }, config.token.secret, { algorithm: 'HS512', expiresIn: '1h' });
};

const decode = (token: string) => {
  try {
    const payload = jwt.verify(token, config.token.secret) as { id: number };
    return payload;
  } catch (error) {
    throw new CustomError(StatusCodes.FORBIDDEN, 'please sign in system');
  }
};

export default {
  create,
  decode,
};
