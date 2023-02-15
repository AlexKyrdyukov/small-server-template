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

const addingQuantity: HandlerType = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    userService.checkById(req.user, userId);

    const { bookId, cartId } = req.body.params;
    const updatedData = await cartProductsService.addingCount(cartId, bookId);

    res.status(StatusCodes.OK).json({ updatedData });
  } catch (error) {
    next(error);
  }
};

export default addingQuantity;
