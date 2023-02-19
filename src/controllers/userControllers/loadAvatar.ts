import { StatusCodes } from 'http-status-codes';

import type { RequestHandler } from 'express';

import { userService } from '../../services';

type BodyType = Record<string, string>;
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
    const avatar = await userService.loadAvatar(req.user.avatar, req.body.file, req.user);
    res.status(StatusCodes.OK).json({ message: 'avatar succesfully updated', avatar });
  } catch (error) {
    next(error);
  }
};

export default loadAvatar;
