import { StatusCodes } from 'http-status-codes';

import type { RequestHandler } from 'express';
import type UserType from '../../db/entities/User';

import CustomError from '../../exceptions/CustomError';
import db from '../../db';

type BodyType = {
  fullName: string;
  dob: Date;
  email: string;
};

type ParamsType = Record<string, never>;

type QueryType = Record<string, never>;

type ResponseType = {
  message: string;
  user: UserType;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const updateUser: HandlerType = async (req, res, next) => {
  try {
    if (req.user.id !== +req.params.userId) {
      throw new CustomError(StatusCodes.FORBIDDEN, 'invalid request, please check entered data');
    }
    req.user.fullName = req.body.fullName;
    req.user.dob = req.body.dob;
    req.user.email = req.body.email;

    await db.user.save(req.user);

    res.status(StatusCodes.OK).json({ message: 'data succesfully updated', user: req.user });
  } catch (error) {
    next(error);
  }
};

export default updateUser;
