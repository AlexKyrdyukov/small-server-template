import { StatusCodes } from 'http-status-codes';

import type { RequestHandler } from 'express';
import { cartService } from '../../services';
import type { CartProductsEntity } from '../../db';

type BodyType = Record<string, never>;
type ParamsType = Record<string, never>;
type QueryType = Record<string, never>;

type ResponseType = {
  cartBooks: CartProductsEntity[];
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const getAll: HandlerType = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const cartBooks = await cartService.getAll(userId);
    res.status(StatusCodes.OK).json({ cartBooks });
  } catch (error) {
    next(error);
  }
};

export default getAll;
