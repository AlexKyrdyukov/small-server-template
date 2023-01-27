import type { Request, Response, NextFunction } from 'express';

import { StatusCodes } from 'http-status-codes';

import { Exception, tokenService } from '../services';

import { CustomError, errorMessages, tokenHelpers, errorTypes } from '../utils';

const authVerification = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deviceId = req.headers.device_id;
    if (!req.headers.authorization) {
      throw Exception.createError(errorTypes.UNAUTHORIZED_USER_LOG_IN);
    }
    const { accessToken, refreshToken } = tokenService.checkAuthType(req.headers.authorization);

    if (!refreshToken || !accessToken) {
      throw Exception.createError(errorTypes.FORBIDDEN_UNKNOWN_AUTHORIZATION_TYPE);
    }

    const payload = await tokenHelpers.decode(accessToken);
    console.log(payload.id);
    // console.log('tokens', tokens, 'deviceId', deviceId);
    next();
  } catch (error) {
    next(error);
  }
};

export default authVerification;
