import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { userService, bookService } from '../../services';

type BodyType = Record<string, never>;

type ParamsType = Record<string, never>;
type QueryType = Record<string, never>;

type ResponseType = {
  message: string;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const like: HandlerType = async (req, res, next) => {
  try {
    userService.checkById(req.user, req.body.userId);

    bookService.like(+req.body.bookId, req.body.user);

    console.log(req.body, req.user);
    res.status(StatusCodes.OK).json({ message: 'data succesfully updated' });
  } catch (error) {
    next(error);
  }
};

export default like;
