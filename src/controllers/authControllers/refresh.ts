import { StatusCodes } from 'http-status-codes';

import type { RequestHandler } from 'express';

import { tokenService, Exception } from '../../services';

import { errorTypes } from '../../utils';

type BodyType = {
  email: string;
  password: string;
};

type ParamsType = Record<string, never>;

type QueryType = Record<string, never>;

type ResponseType = {
  message: string;
  accessToken: string;
  refreshToken: string;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const refresh: HandlerType = async (req, res, next) => {
  try {
    const deviceId = req.headers.device_id;
    console.log(deviceId);
    if (!deviceId) {
      throw Exception.createError(errorTypes.FORBIDDEN_UNKNOWN_AUTHORIZATION_TYPE);
    }

    const token = tokenService.checkAuthType(req.headers.authorization);
    const {
      accessToken, refreshToken,
    } = await tokenService.checkRefresh(deviceId as string, token.refreshToken);

    res.status(StatusCodes.OK).json({ message: 'tokens succesfully updated', accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
};

export default refresh;
