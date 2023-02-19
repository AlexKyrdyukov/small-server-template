import type { Request, Response, NextFunction } from 'express';

import { errorTypes } from '../utils';
import { Exception, tokenService, userService } from '../services';

const authVerification = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) {
      throw Exception.createError(errorTypes.UNAUTHORIZED_USER);
    }
    const [auth, token] = req.headers.authorization.split(' ');

    if (auth !== 'Bearer') {
      throw Exception.createError(errorTypes.FORBIDDEN_UNKNOWN_AUTHORIZATION_TYPE);
    }
    const { userId } = await tokenService.verifyToken(token);

    req.user = await userService.getById(userId);
    next();
  } catch (error) {
    next(error);
  }
};

export default authVerification;
