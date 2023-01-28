import { StatusCodes } from 'http-status-codes';
import type { RequestHandler } from 'express';

import { userService } from '../../services';
import type { UsersEntity } from '../../db';

type BodyType = {
  fullName: string;
  dob: Date;
  email: string;
};

type ParamsType = Record<string, never>;

type QueryType = Record<string, never>;

type ResponseType = {
  message: string;
  user: UsersEntity;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const updateUser: HandlerType = async (req, res, next) => {
  try {
    const { email, fullName } = req.body;

    userService.checkById(req.user, req.params.userId);

    const user = await userService.updateUser(req.user, email, fullName);

    res.status(StatusCodes.OK).json({ message: 'data succesfully updated', user });
  } catch (error) {
    next(error);
  }
};

export default updateUser;
