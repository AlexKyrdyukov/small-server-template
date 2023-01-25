import { StatusCodes } from 'http-status-codes';

import type { RequestHandler } from 'express';

import db, { UsersEntity } from '../../db';
import redis from '../../redis';

import { CustomError, errorMessages, tokenHelpers, hashHelpers } from '../../utils';

type BodyType = UsersEntity;

type ParamsType = Record<string, never>;

type QueryType = Record<string, never>;

type ResponseType = {
  message: string;
  user: UsersEntity;
  accessToken: string;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const signUp: HandlerType = async (req, res, next) => {
  try {
    const deviceId = req.headers.deviceId;
    console.log(deviceId);
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

    const accessToken = await tokenHelpers.create(user.userId);

    const refreshToken = await tokenHelpers.create(user.userId);
    redis.refreshTokens.set(deviceId as string, refreshToken);

    res.status(StatusCodes.CREATED).json({ message: 'user successfully registered', user, accessToken });
  } catch (error) {
    next(error);
  }
};

export default signUp;
