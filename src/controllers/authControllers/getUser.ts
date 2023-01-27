import { StatusCodes } from 'http-status-codes';

import type { RequestHandler } from 'express';

import type { UsersEntity } from '../../db';

type BodyType = Record<string, never>;

type ParamsType = Record<string, never>;

type QueryType = Record<string, never>;

type ResponseType = {
  user: UsersEntity;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const getMe: HandlerType = async (req, res, next) => {
  try {
    // console.log(req.user);
    res.status(StatusCodes.OK).json({ user: req.user });
  } catch (error) {
    next(error);
  }
};

export default getMe;
