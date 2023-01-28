import { StatusCodes } from 'http-status-codes';

import type { RequestHandler } from 'express';

import type { BooksEntity } from '../../db';

import { bookService } from '../../services';

type BodyType = Record<string, never>;

type ParamsType = {
  bookId: number;
};

type QueryType = Record<string, never>;

type ResponseType = {
  book: BooksEntity;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const getBook: HandlerType = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const book = await bookService.getBookById(bookId);
    res.status(StatusCodes.OK).json({ book });
  } catch (error) {
    next(error);
  }
};

export default getBook;
