import type { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import CustomError from '../exceptions/CustomError';
import tokenWorker from '../utils/tokenHelper';
import db from '../db';

const authVerification = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      throw new CustomError(StatusCodes.FORBIDDEN, 'please sign in');
    }
    const payload = tokenWorker.decode(token);
    req.user = await db.user.findOne({ where: { id: payload.id } });
    if (!req.user) {
      throw new CustomError(StatusCodes.NOT_FOUND, 'user not found');
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default authVerification;
