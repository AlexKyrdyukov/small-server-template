import type { RequestHandler } from 'express';

import { StatusCodes } from 'http-status-codes';

import db from '../../db';

import type { UsersEntity } from '../../db';

import { CustomError, errorMessages } from '../../utils';

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
    if (req.user.userId !== +req.params.userId) {
      throw new CustomError(StatusCodes.FORBIDDEN, errorMessages.USER_INVALID_REQUEST);
    }
    req.user.fullName = req.body.fullName;
    // req.user.avatar = req.body.avatar;
    req.user.email = req.body.email;

    await db.user.save(req.user);

    res.status(StatusCodes.OK).json({ message: 'data succesfully updated', user: req.user });
  } catch (error) {
    next(error);
  }
};

export default updateUser;
