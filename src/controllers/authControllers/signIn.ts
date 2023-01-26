import { StatusCodes } from 'http-status-codes';

import type { RequestHandler } from 'express';
import type { UsersEntity } from '../../db';

import db from '../../db';

import authService from '../../services/tokenSevice';

import { CustomError, errorMessages, hashHelpers } from '../../utils';

type BodyType = {
  email: string;
  password: string;
};

type ParamsType = Record<string, never>;

type QueryType = Record<string, never>;

type ResponseType = {
  user: UsersEntity;
  accessToken: string;
  refreshToken: string;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const signIn: HandlerType = async (req, res, next) => {
  try {
    const deviceId = req.headers.deviceId;
    // eslint-disable-next-line no-console
    console.log('signIn', deviceId);
    const { email, password } = req.body;

    const user = await db.user
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();

    if (!user) {
      throw new CustomError(StatusCodes.BAD_REQUEST, errorMessages.USER_NOT_FOUND);
    }

    const passwordVerification = hashHelpers.checkPassword(password, user.password);
    delete user.password;
    if (!passwordVerification) {
      throw new CustomError(StatusCodes.BAD_REQUEST, errorMessages.USER_INVALID_PASSWORD);
    }

    const {
      refreshToken, accessToken,
    } = await authService.generateTokens(user.userId, deviceId as string);

    res.status(StatusCodes.OK).json({ user, accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
};

export default signIn;
