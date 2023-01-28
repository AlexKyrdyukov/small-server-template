import { StatusCodes } from 'http-status-codes';

import type { RequestHandler } from 'express';
import type { UsersEntity } from '../../db';

import { userService, tokenService, Exception } from '../../services';

import { errorTypes, hashHelpers } from '../../utils';

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
    const deviceId = req.headers.device_id;

    const { email, password } = req.body;

    const user = await userService.findFullUser(email);

    const passwordVerification = hashHelpers.checkPassword(password, user.password);
    delete user.password;

    if (!passwordVerification) {
      throw Exception.createError(errorTypes.BAD_REQUEST_INVALID_PASSWORD);
    }

    const {
      refreshToken, accessToken,
    } = await tokenService.generateTokens(user.userId, deviceId as string);

    res.status(StatusCodes.OK).json({ user, accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
};

export default signIn;
