import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { userService, raitingService, bookService } from '../../services';

type BodyType = Record<string, never>;

type ParamsType = Record<string, never>;
type QueryType = Record<string, never>;

type ResponseType = {
  message: string;
  newRaiting: string;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const changeRaiting: HandlerType = async (req, res, next) => {
  try {
    const { userId, bookId, newRaiting } = req.body;
    // eslint-disable-next-line no-console
    console.log(userId, bookId, newRaiting);
    userService.checkById(req.user, userId);
    console.log(24);
    const book = await bookService.getById(bookId);
    // console.log(book);
    const raiting = raitingService.changeRaiting(book, req.user, newRaiting);

    res.status(StatusCodes.OK).json({ message: 'data succesfully updated', newRaiting });
  } catch (error) {
    next(error);
  }
};

export default changeRaiting;
