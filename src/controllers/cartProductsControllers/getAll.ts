import { StatusCodes } from 'http-status-codes';
import type { RequestHandler } from 'express';
import CartProducts from 'src/db/entities/CartProducts';
import { cartProductsService, cartService, userService } from '../../services';
import type { CartsEntity } from '../../db';

type BodyType = Record<string, never>;

type ParamsType = Record<string, never>;
type QueryType = Record<string, never>;

type ResponseType = {
  cartBooks: CartsEntity;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const getAll: HandlerType = async (req, res, next) => {
  try {
    const userId = req.query.userId;

    userService.checkById(req.user, userId);
    const cartBooks = await cartService.getAll(req.user.cart.cartId);

    res.status(StatusCodes.OK).json({ cartBooks });
  } catch (error) {
    next(error);
  }
};

export default getAll;
