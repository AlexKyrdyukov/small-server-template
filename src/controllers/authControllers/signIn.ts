import { StatusCodes } from 'http-status-codes';

import type { RequestHandler } from 'express';
import type { UsersEntity } from '../../db';

import { userService, tokenService } from '../../services';

type BodyType = Record<string, never>;
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

    const user = await userService.findFull(email);

    userService.checkPassword(password, user.password);

    delete user.password;

    const {
      refreshToken, accessToken,
    } = await tokenService.createTokens(String(user.userId), deviceId as string);

    res.status(StatusCodes.OK).json({ user, accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
};

export default signIn;
