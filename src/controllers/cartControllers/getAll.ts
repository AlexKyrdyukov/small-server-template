import { StatusCodes } from 'http-status-codes';
import type { RequestHandler } from 'express';
import { cartService, userService } from '../../services';

type BodyType = Record<string, never>;

type ParamsType = Record<string, never>;
type QueryType = Record<string, never>;

type ResponseType = {
  message: string;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const getAll: HandlerType = async (req, res, next) => {
  try {
    const userId = req.query.userId;
    console.log(19, 'getAll');
    userService.checkById(req.user, userId);
    const books = await cartService.getAll(userId);
    // eslint-disable-next-line no-console
    console.log(req.body, req.params, req.query);
    // eslint-disable-next-line no-console
    console.log(books);
    res.status(StatusCodes.OK).json({ message: 'data succesfully updated' });
  } catch (error) {
    next(error);
  }
};

export default getAll;
