import { StatusCodes } from 'http-status-codes';

import type { RequestHandler } from 'express';

import { cartService } from '../../services';

type BodyType = Record<string, never>;
type ParamsType = Record<string, never>;
type QueryType = Record<string, never>;

type ResponseType = {
  message: string;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const deleteById: HandlerType = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    await cartService.deleteById(bookId, req.user);

    res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (error) {
    next(error);
  }
};

export default deleteById;
