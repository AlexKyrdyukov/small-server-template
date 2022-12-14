import { StatusCodes } from 'http-status-codes';

import type { RequestHandler } from 'express';

import CustomError from '../../exceptions/CustomError';
import db from '../../db';

type BodyType = Record<string, never>;

type ParamsType = Record<string, never>;

type QueryType = Record<string, never>;

type ResponseType = {
  message: string;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const deleteUser: HandlerType = async (req, res, next) => {
  try {
    if (req.user.id !== +req.params.userId) {
      throw new CustomError(StatusCodes.FORBIDDEN, 'invalid request, please check entered data');
    }
    await db.user.remove(req.user);
    res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (error) {
    next(error);
  }
};

export default deleteUser;
