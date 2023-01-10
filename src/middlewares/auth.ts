import type { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import CustomError from '../exceptions/CustomError';
import tokenWorker from '../utils/tokenHelper';
import errorText from '../utils/consts/error';
import db from '../db';

const authVerification = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) {
      throw new CustomError(StatusCodes.FORBIDDEN, errorText.USER_SIGN_IN);
    }
    const token = req.headers.authorization.split(' ')[1];

    const payload = tokenWorker.decode(token);

    req.user = await db.user.findOne({ where: { id: payload.id } });

    if (!req.user) {
      throw new CustomError(StatusCodes.NOT_FOUND, errorText.USER_NOT_FOUND);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default authVerification;
