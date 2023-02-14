import { StatusCodes } from 'http-status-codes';
import type { RequestHandler } from 'express';
import { cartProductsService, userService } from '../../services';

type BodyType = Record<string, never>;

type ParamsType = Record<string, never>;
type QueryType = Record<string, never>;

type ResponseType = {
  updatedData: {
    bookId: number;
    countBook: number;
  };
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const deleteById: HandlerType = async (req, res, next) => {
  try {
    // eslint-disable-next-line no-console
    const { bookId, cartId } = req.body;
    const { userId } = req.params;

    userService.checkById(req.user, userId);

    const updatedData = await cartProductsService.deleteById(bookId, cartId);

    res.status(StatusCodes.OK).json({ updatedData });
  } catch (error) {
    next(error);
  }
};

export default deleteById;
