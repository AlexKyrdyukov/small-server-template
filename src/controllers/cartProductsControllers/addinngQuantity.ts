import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { cartService } from 'src/services';
import type { CartProductsEntity } from '../../db';

type BodyType = Record<string, never>;

type ParamsType = Record<string, never>;
type QueryType = Record<string, never>;

type ResponseType = {
  cartBooks: string; // CartProductsEntity[];
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const addingQuantity: HandlerType = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const { bookId, cartId } = req.body.params;

    res.status(StatusCodes.OK).json({ cartBooks: 'cartBooks' });
  } catch (error) {
    next(error);
  }
};

export default addingQuantity;
