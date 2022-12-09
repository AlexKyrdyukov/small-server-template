import { StatusCodes } from 'http-status-codes';
import type { Request, Response, NextFunction } from 'express';

import CustomError from '../exceptions/CustomError';
import tokenWorker from '../utils/tokenHelper';
import dB from '../db';

const authVerification = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    // eslint-disable-next-line no-console
    console.log(req.query);
    // eslint-disable-next-line no-console
    console.log(req.params, req.body);
    // eslint-disable-next-line no-console
    console.log(req.url);
    if (!token) {
      throw new CustomError(StatusCodes.BAD_REQUEST, 'please sign in');
    }
    const decodedToken = tokenWorker.decoded(token);
    // eslint-disable-next-line no-console
    console.log(decodedToken.id);
    req.user = await dB.user.findOne({ where: { id: decodedToken.id } });
    if (!req.user) {
      throw new CustomError(StatusCodes.NOT_FOUND, 'user not found');
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default authVerification;
