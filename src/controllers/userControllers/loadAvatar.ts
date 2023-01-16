import { StatusCodes } from 'http-status-codes';

import type { RequestHandler } from 'express';
import type UserType from '../../db/entities/User';

import config from '../../config';
import CustomError from '../../exceptions/CustomError';
import fileHelpers from '../../utils/fileHelpers';
import errorText from '../../utils/consts/error';
import db from '../../db';

type BodyType = {
  file: string;
};

type ParamsType = Record<string, never>;

type QueryType = Record<string, never>;

type ResponseType = {
  message: string;
  avatar: UserType['avatar'];
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const loadAvatar: HandlerType = async (req, res, next) => {
  try {
    if (req.user.id !== +req.params.userId) {
      throw new CustomError(StatusCodes.FORBIDDEN, errorText.USER_INVALID_REQUEST);
    }
    fileHelpers.remove();
    req.user.avatar = fileHelpers.write(req.body.file);

    await db.user.save(req.user);
    res.status(StatusCodes.OK).json({ message: 'data succesfully updated', avatar: `${config.urls.current}/userAvatar/${req.user.avatar}` });
  } catch (error) {
    next(error);
  }
};

export default loadAvatar;
