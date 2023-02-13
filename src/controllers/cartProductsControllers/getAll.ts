import { StatusCodes } from 'http-status-codes';
import type { RequestHandler } from 'express';
import { cartProductsService, cartService, userService } from '../../services';
import type { CartsEntity } from '../../db';
import CartProducts from 'src/db/entities/CartProducts';

type BodyType = Record<string, never>;

type ParamsType = Record<string, never>;
type QueryType = Record<string, never>;

type ResponseType = {
  message: string;
  books: CartsEntity;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const getAll: HandlerType = async (req, res, next) => {
  try {
    const userId = req.query.userId;
    // eslint-disable-next-line no-console
    console.log(19, 'getAll');
    userService.checkById(req.user, userId);
    const books = await cartService.getAll(req.user.cart.cartId);
    // eslint-disable-next-line no-console
    console.log(req.body, req.params, req.query);
    // const books = await cartProductsService.getAll(req.user.cart.cartId);
    // eslint-disable-next-line no-console
    console.log(books);
    res.status(StatusCodes.OK).json({ message: 'data succesfully updated', books });
  } catch (error) {
    next(error);
  }
};

export default getAll;
