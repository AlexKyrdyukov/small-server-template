import { StatusCodes } from 'http-status-codes';

import type { RequestHandler } from 'express';

import db from '../../db';

import { CustomError, errorMessages, fileHelpers } from '../../utils';

type BodyType = {
  file: string;
};

type ParamsType = Record<string, never>;

type QueryType = Record<string, never>;

type ResponseType = {
  message: string;
  avatar: string;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const loadAvatar: HandlerType = async (req, res, next) => {
  try {
    if (req.user.userId !== +req.params.userId) {
      throw new CustomError(StatusCodes.FORBIDDEN, errorMessages.USER_INVALID_REQUEST);
    }
    fileHelpers.remove(req.user.avatar);
    req.user.avatar = fileHelpers.write(req.body.file);

    await db.user.save(req.user);

    res.status(StatusCodes.OK).json({ message: 'data succesfully updated', avatar: fileHelpers.getUrl(req.user.avatar, 'userAvatars') });
  } catch (error) {
    next(error);
  }
};

export default loadAvatar;
