import { StatusCodes } from 'http-status-codes';

import type { RequestHandler } from 'express';

import { ratingService, bookService } from '../../services';

type BodyType = Record<string, never>;
type ParamsType = Record<string, never>;
type QueryType = Record<string, never>;

type ResponseType = {
  message: string;
  newRating: string;
  bookId: number;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const setRating: HandlerType = async (req, res, next) => {
  try {
    const { bookId, rating } = req.body;
    const book = await bookService.getById(bookId);
    const newRating = await ratingService.changeValue(book, req.user, rating);

    res.status(StatusCodes.OK).json({ message: 'data succesfully updated', newRating, bookId });
  } catch (error) {
    next(error);
  }
};

export default setRating;
