import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { userService, ratingService, bookService } from '../../services';

type BodyType = Record<string, never>;

type ParamsType = Record<string, never>;
type QueryType = Record<string, never>;

type ResponseType = {
  message: string;
  newRating: string;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const changeRating: HandlerType = async (req, res, next) => {
  try {
    const { userId, bookId, newRating } = req.body;

    userService.checkById(req.user, userId);

    const book = await bookService.getById(bookId);
    const rating = ratingService.changeRating(book, req.user, newRating);
    // eslint-disable-next-line no-console
    console.log(rating);
    res.status(StatusCodes.OK).json({ message: 'data succesfully updated', newRating });
  } catch (error) {
    next(error);
  }
};

export default changeRating;
