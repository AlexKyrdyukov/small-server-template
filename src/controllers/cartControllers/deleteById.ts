import { StatusCodes } from 'http-status-codes';

import type { RequestHandler } from 'express';

import { userService } from '../../services';

type BodyType = Record<string, never>;
type ParamsType = Record<string, never>;
type QueryType = Record<string, never>;

type ResponseType = {
  message: string;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const deleteById: HandlerType = async (req, res, next) => {
  try {
    const { bookId, cartId } = req.body;
    const { userId } = req.params;

    userService.checkById(req.user, userId);

    res.status(StatusCodes.OK).json({ message: 'ddddddd' });
  } catch (error) {
    next(error);
  }
};

export default deleteById;
