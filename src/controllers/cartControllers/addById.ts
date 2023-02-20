import { StatusCodes } from 'http-status-codes';

import type { RequestHandler } from 'express';
import { cartService } from '../../services';
import type { CartProductsEntity } from '../../db';

type BodyType = Record<string, never>;
type ParamsType = Record<string, never>;
type QueryType = Record<string, never>;

type ResponseType = {
  cartProduct: CartProductsEntity;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const addById: HandlerType = async (req, res, next) => {
  try {
    const { bookId } = req.body;
    const cartProduct = await cartService.addById(bookId, req.user);
    res.status(StatusCodes.OK).json({ cartProduct });
  } catch (error) {
    next(error);
  }
};

export default addById;
