import type { Request, Response, NextFunction } from 'express';

import { Exception, tokenService, userService } from '../services';

import { tokenHelpers, errorTypes } from '../utils';

const authVerification = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) {
      throw Exception.createError(errorTypes.UNAUTHORIZED_USER_LOG_IN);
    }
    // this func return & refresh token
    const { accessToken } = tokenService.checkAuthType(req.headers.authorization);
    console.log('auth after 14 line');
    const { userId } = await tokenHelpers.decode(accessToken, errorTypes.UNAUTHORIZED_USER_LOG_IN);
    console.log(userId);
    req.user = await userService.getUser(userId);

    next();
  } catch (error) {
    next(error);
  }
};

export default authVerification;
