import { StatusCodes } from 'http-status-codes';
import type { RequestHandler } from 'express';

import dB from '../../db';

type BodyType = Record<string, never>;

type ParamsType = Record<string, never>;

type QueryType = Record<string, never>;

type ResponseType = {
  message: string;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const deleteUser: HandlerType = async (req, res, next) => {
  try {
    // eslint-disable-next-line no-console
    console.log(req.query, req.params, req.body);
    await dB.user.remove(req.user);
    delete req.user;
    res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (error) {
    next(error);
  }
};

export default deleteUser;
