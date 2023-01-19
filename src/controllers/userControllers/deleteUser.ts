import { StatusCodes } from 'http-status-codes';

import type { RequestHandler } from 'express';

import db from '../../db';

import { CustomError, errorMessages } from '../../utils';

type BodyType = Record<string, never>;

type ParamsType = Record<string, never>;

type QueryType = Record<string, never>;

type ResponseType = {
  message: string;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const deleteUser: HandlerType = async (req, res, next) => {
  try {
    if (req.user.userId !== +req.params.userId) {
      throw new CustomError(StatusCodes.FORBIDDEN, errorMessages.USER_INVALID_REQUEST);
    }
    await db.user.remove(req.user);
    res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (error) {
    next(error);
  }
};

export default deleteUser;
