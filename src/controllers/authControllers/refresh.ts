import { StatusCodes } from 'http-status-codes';

import type { RequestHandler } from 'express';

import redis from '../../redis';
import config from '../../config';

import { CustomError, tokenHelpers, errorMessages } from '../../utils';

type BodyType = {
  email: string;
  password: string;
};

type ParamsType = Record<string, never>;

type QueryType = Record<string, never>;

type ResponseType = {
  accessToken: string;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const refresh: HandlerType = async (req, res, next) => {
  try {
    // eslint-disable-next-line no-console
    console.log(req.headers.deviceId);
    const { deviceId } = req.headers;
    if (!deviceId) {
      throw new CustomError(StatusCodes.UNAUTHORIZED, errorMessages.USER_SIGN_IN);
    }
    redis.refreshTokens.get(deviceId as string);
    const accessToken = await tokenHelpers.create(req.user.userId, config.token.expiresIn.access);

    res.status(StatusCodes.OK).json({ accessToken });
  } catch (error) {
    next(error);
  }
};

export default refresh;
