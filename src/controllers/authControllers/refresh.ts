import { StatusCodes } from 'http-status-codes';

import type { RequestHandler } from 'express';

import { errorTypes } from '../../utils';
import { tokenService, Exception } from '../../services';
import config from '../../config';

type BodyType = Record<string, never>;
type PayloadType = Record<string, never>;
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
    if (!deviceId) {
      throw Exception.createError(errorTypes.FORBIDDEN_UNKNOWN_AUTHORIZATION_TYPE);
    }

    const token = tokenService.checkAuthType(req.body.token);
    await tokenService.verifyRefresh(deviceId as string, token);

    const { userId }: PayloadType = await tokenService.asyncVerify(
      token,
      config.token.secret,
      { complete: false },
    );

    const {
      accessToken,
      refreshToken,
    } = await tokenService.createTokens(userId, deviceId as string);

    res.status(StatusCodes.OK).json({ message: 'tokens succesfully updated', accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
};

export default refresh;
