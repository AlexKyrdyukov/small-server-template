import type { Request, Response, NextFunction } from 'express';

import { StatusCodes } from 'http-status-codes';

import db from '../db';

import { CustomError, errorMessages, tokenHelpers, checkAuth } from '../utils';

const authVerification = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers.authorization;
    console.log('auth', req.headers.deviceid);
    const token = checkAuth(authorization);
    const payload = await tokenHelpers.decode(token);

    req.user = await db.user.findOne({ where: { userId: payload.id } });

    if (!req.user) {
      throw new CustomError(StatusCodes.NOT_FOUND, errorMessages.USER_NOT_FOUND);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default authVerification;
