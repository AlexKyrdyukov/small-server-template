import { StatusCodes } from 'http-status-codes';

import type { RequestHandler } from 'express';

type BodyType = Record<string, never>;
type ParamsType = Record<string, never>;
type QueryType = Record<string, never>;

type ResponseType = {
  cartBooks: string;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const getAll: HandlerType = async (req, res, next) => {
  try {
    const userId = req.query.userId;

    res.status(StatusCodes.OK).json({ cartBooks: 'srting' });
  } catch (error) {
    next(error);
  }
};

export default getAll;
