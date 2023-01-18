import { StatusCodes } from 'http-status-codes';

import type { RequestHandler } from 'express';
import type UserType from '../../db/entities/User';

import CustomError from '../../utils/CustomError';
import fileHelpers from '../../utils/fileHelpers';
import errorText from '../../utils/errorMessages';
import db from '../../db';
import dbHelper from '../../utils/dbHelper';

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
    if (req.user.userId !== +req.params.userId) {
      throw new CustomError(StatusCodes.FORBIDDEN, errorText.USER_INVALID_REQUEST);
    }
    // eslint-disable-next-line no-console
    console.log(req.user.avatar);
    fileHelpers.remove(req.user.avatar);
    req.user.avatar = fileHelpers.write(req.body.file);

    await db.user.save(req.user);

    res.status(StatusCodes.OK).json({ message: 'data succesfully updated', avatar: dbHelper.getFileUrl(req.user.avatar, 'userAvatars') });
  } catch (error) {
    next(error);
  }
};

export default loadAvatar;
