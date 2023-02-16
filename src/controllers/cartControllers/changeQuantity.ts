import { StatusCodes } from 'http-status-codes';

import type { RequestHandler } from 'express';

type BodyType = Record<string, never>;

type ParamsType = Record<string, never>;

type QueryType = Record<string, never>;

type ResponseType = Record<string, string>;

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const quantityChange: HandlerType = async (req, res, next) => {
  try {
    // eslint-disable-next-line no-console
    console.log('cart changeQuantity', req.body, req.params, req.query);
    res.status(StatusCodes.OK).json({ book: 'dfdfdfdfdf' });
  } catch (error) {
    next(error);
  }
};

export default quantityChange;
