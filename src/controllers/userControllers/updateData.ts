import { StatusCodes } from 'http-status-codes';

import type { RequestHandler } from 'express';
import type { UsersEntity } from '../../db';

import { userService } from '../../services';

type BodyType = Record<string, never>;
type ParamsType = Record<string, never>;
type QueryType = Record<string, never>;

type ResponseType = {
  message: string;
  user: UsersEntity;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const updateUser: HandlerType = async (req, res, next) => {
  try {
    const newValues = req.body;

    userService.checkById(req.user, req.params.userId);

    const user = await userService.update(newValues, req.user);

    res.status(StatusCodes.OK).json({ message: 'data succesfully updated', user });
  } catch (error) {
    next(error);
  }
};

export default updateUser;
