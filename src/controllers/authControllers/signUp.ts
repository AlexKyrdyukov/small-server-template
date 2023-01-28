import { StatusCodes } from 'http-status-codes';

import type { RequestHandler } from 'express';

import type { UsersEntity } from '../../db';

import { tokenService, userService, Exception } from '../../services';

import { errorTypes } from '../../utils';

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
    console.log(deviceId);
    const { email, password } = req.body;
    const existenUser = await userService.existenceCheck(email);
    if (existenUser) {
      throw Exception.createError(errorTypes.BAD_REQUEST_USER_ALREADY_EXIST);
    }
    const user = await userService.createUser(email, password);

    const {
      refreshToken, accessToken,
    } = await tokenService.generateTokens(user.userId, deviceId as string);

    res.status(StatusCodes.CREATED).json({ message: 'user successfully registered', user, accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
};

export default signUp;
