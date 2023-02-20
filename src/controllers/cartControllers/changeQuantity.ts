import { StatusCodes } from 'http-status-codes';

import type { RequestHandler } from 'express';
import { cartService } from '../../services';

type BodyType = Record<string, never>;

type ParamsType = Record<string, never>;

type QueryType = Record<string, never>;

type ResponseType = Record<string, string>;

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const quantityChange: HandlerType = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const { bookId } = req.params;
    await cartService.changeQuantity(bookId, quantity, req.user);
    res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (error) {
    next(error);
  }
};

export default quantityChange;
