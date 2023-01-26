import { StatusCodes } from 'http-status-codes';

import type { RequestHandler } from 'express';

import db, { UsersEntity } from '../../db';

import authService from '../../services/tokenSevice';

import { CustomError, errorMessages, hashHelpers } from '../../utils';

type BodyType = UsersEntity;

type ParamsType = Record<string, never>;

type QueryType = Record<string, never>;

type ResponseType = {
  message: string;
  user: UsersEntity;
  accessToken: string;
  refreshToken: string;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const signUp: HandlerType = async (req, res, next) => {
  try {
    const deviceId = req.headers.deviceId;
    // eslint-disable-next-line no-console
    console.log('sigUp', deviceId);
    const existenUser = await db.user.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (existenUser) {
      throw new CustomError(StatusCodes.BAD_REQUEST, errorMessages.USER_ALREADY_EXISTS);
    }

    const newUser = new UsersEntity();
    newUser.email = req.body.email;
    newUser.password = hashHelpers.hashPassword(req.body.password);
    const user = await db.user.save(newUser);
    delete user.password;

    const {
      refreshToken, accessToken,
    } = await authService.generateTokens(user.userId, deviceId as string);

    res.status(StatusCodes.CREATED).json({ message: 'user successfully registered', user, accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
};

export default signUp;
