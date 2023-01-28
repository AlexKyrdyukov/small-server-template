import { StatusCodes } from 'http-status-codes';

import type { RequestHandler } from 'express';

import db from '../../db';
import { userService } from '../../services';
import { fileHelpers } from '../../utils';

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
    userService.checkById(req.user, req.params.userId);

    req.user.avatar = fileHelpers.writeImage(req.body.file, 'avatars', req.user.avatar);

    await db.user.save(req.user);

    res.status(StatusCodes.OK).json({ message: 'avatar succesfully updated', avatar: fileHelpers.getUrlImage(req.user.avatar, 'userAvatars') });
  } catch (error) {
    next(error);
  }
};

export default loadAvatar;
