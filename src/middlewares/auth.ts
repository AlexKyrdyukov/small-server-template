import type { Request, Response, NextFunction } from 'express';

import { StatusCodes } from 'http-status-codes';

import db from '../db';

import { CustomError, errorMessages, tokenHelpers } from '../utils';

const authVerification = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) {
      throw new CustomError(StatusCodes.FORBIDDEN, errorMessages.USER_SIGN_IN);
    }
    const token = req.headers.authorization.split(' ')[1];

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
