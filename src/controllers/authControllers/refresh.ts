import { StatusCodes } from 'http-status-codes';

import type { RequestHandler } from 'express';

import { errorTypes } from '../../utils';
import { tokenService, Exception } from '../../services';

type BodyType = Record<string, string>;
type ParamsType = Record<string, never>;
type QueryType = Record<string, never>;

type ResponseType = {
  accessToken: string;
  refreshToken: string;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const refresh: HandlerType = async (req, res, next) => {
  try {
    const deviceId = req.headers.device_id;
    const [auth, token] = req.body.token.split(' ');

    if (!deviceId || auth !== 'Bearer') {
      throw Exception.createError(errorTypes.FORBIDDEN_UNKNOWN_AUTHORIZATION_TYPE);
    }

    const { userId } = await tokenService.verifyRefresh(deviceId as string, token);

    const {
      accessToken,
      refreshToken,
    } = await tokenService.createTokens(userId, deviceId as string);

    res.status(StatusCodes.OK).json({ accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
};

export default refresh;
