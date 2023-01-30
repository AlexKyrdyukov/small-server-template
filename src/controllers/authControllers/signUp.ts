import { StatusCodes } from 'http-status-codes';

import type { RequestHandler } from 'express';

import type { UsersEntity } from '../../db';

import { tokenService, userService } from '../../services';

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
    const deviceId = req.headers.device_id;

    const userData = req.body;
    await userService.existenceCheck(userData.email);

    const user = await userService.create(userData);

    const {
      refreshToken, accessToken,
    } = await tokenService.generateTokens(user.userId, deviceId as string);

    res.status(StatusCodes.CREATED).json({ message: 'user successfully registered', user, accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
};

export default signUp;
