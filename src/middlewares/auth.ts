import type { Request, Response, NextFunction } from 'express';

import { Exception, tokenService, userService } from '../services';
import { errorTypes } from '../utils';

import config from '../config';

type PayloadType = {
  userId: number;
};

const authVerification = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) {
      throw Exception.createError(errorTypes.UNAUTHORIZED_USER_LOG_IN);
    }
    // eslint-disable-next-line no-console
    console.log(14, req.headers.authorization);

    // this func can return & refresh token
    const token = tokenService.checkAuthType(req.headers.authorization);
    // eslint-disable-next-line no-console
    console.log(token);
    const payload: PayloadType = await tokenService.asyncVerify(
      token,
      config.token.secret,
      { complete: false },
    );
    // eslint-disable-next-line no-console
    console.log(25, payload);
    req.user = await userService.getById(payload.userId);

    next();
  } catch (error) {
    next(error);
  }
};

export default authVerification;
