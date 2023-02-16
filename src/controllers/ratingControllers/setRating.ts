import { StatusCodes } from 'http-status-codes';

import type { RequestHandler } from 'express';

import { userService, ratingService, bookService } from '../../services';

type BodyType = Record<string, never>;
type ParamsType = Record<string, never>;
type QueryType = Record<string, never>;

type ResponseType = {
  message: string;
  rating: string;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const setRating: HandlerType = async (req, res, next) => {
  try {
    const { userId, bookId, newRating } = req.body;

    userService.checkById(req.user, userId);
    const book = await bookService.getById(bookId);
    const rating = await ratingService.changeValue(book, req.user, newRating);

    res.status(StatusCodes.OK).json({ message: 'data succesfully updated', rating });
  } catch (error) {
    next(error);
  }
};

export default setRating;
