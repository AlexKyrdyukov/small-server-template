import type { RequestHandler } from 'express';

import { StatusCodes } from 'http-status-codes';

import db from '../../db';

import { CustomError, errorMessages, hashHelpers } from '../../utils';

type BodyType = {
  password: string;
  newPassword: string;
};

type ParamsType = Record<string, never>;

type QueryType = Record<string, never>;

type ResponseType = {
  message: string;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const updateUserPass: HandlerType = async (req, res, next) => {
  try {
    if (req.user.userId !== +req.params.userId) {
      throw new CustomError(StatusCodes.FORBIDDEN, errorMessages.USER_INVALID_REQUEST);
    }
    const { password, newPassword } = req.body;
    const userId = req.user.userId;
    const user = await db.user
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.userId = :userId', { userId })
      .getOne();
    const passwordVerification = hashHelpers.checkPassword(password, user.password);
    if (!passwordVerification) {
      throw new CustomError(StatusCodes.BAD_REQUEST, errorMessages.USER_INVALID_PASSWORD);
    }
    user.password = hashHelpers.hashPassword(newPassword);
    await db.user.save(user);
    res.status(StatusCodes.OK).json({ message: 'new password succesfully updated' });
  } catch (error) {
    next(error);
  }
};

export default updateUserPass;
