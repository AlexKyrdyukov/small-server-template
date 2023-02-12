import { StatusCodes } from 'http-status-codes';
import type { RequestHandler } from 'express';
import { cartProductsService } from '../../services';

type BodyType = Record<string, never>;

type ParamsType = Record<string, never>;
type QueryType = Record<string, never>;

type ResponseType = {
  message: string;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const addById: HandlerType = async (req, res, next) => {
  try {
    // eslint-disable-next-line no-console
    const { bookId } = req.body;
    const { userId } = req.params;
    const cart = await cartProductsService.create(bookId, userId);
    // eslint-disable-next-line no-console
    console.log('23art', cart);
    res.status(StatusCodes.OK).json({ message: 'data succesfully updated' });
  } catch (error) {
    next(error);
  }
};

export default addById;
