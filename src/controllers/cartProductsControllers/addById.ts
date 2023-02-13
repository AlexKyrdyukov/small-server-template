import type { CartProductsEntity } from 'src/db';
import { StatusCodes } from 'http-status-codes';
import type { RequestHandler } from 'express';
import { cartProductsService, userService } from '../../services';

type BodyType = Record<string, never>;

type ParamsType = Record<string, never>;
type QueryType = Record<string, never>;

type ResponseType = {
  message: string;
  cartBooks: CartProductsEntity[];
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const addById: HandlerType = async (req, res, next) => {
  try {
    const { bookId } = req.body;
    const { userId } = req.params;
    userService.checkById(req.user, userId);
    const cartBooks = await cartProductsService.create(bookId, req.user);
    res.status(StatusCodes.OK).json({ message: 'data succesfully updated', cartBooks });
  } catch (error) {
    next(error);
  }
};

export default addById;
