import type { Request, Response, NextFunction } from 'express';

import { Exception, tokenService, userService } from '../services';

import { tokenHelpers, errorTypes } from '../utils';

const authVerification = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) {
      throw Exception.createError(errorTypes.UNAUTHORIZED_USER_LOG_IN);
    }

    // this func can return & refresh token
    const tokens = tokenService.checkAuthType(req.headers.authorization);
    const { id } = await tokenHelpers.decode(
      tokens.accessToken, errorTypes.UNAUTHORIZED_USER_LOG_IN,
    );

    req.user = await userService.getUser(id);

    next();
  } catch (error) {
    next(error);
  }
};

export default authVerification;
