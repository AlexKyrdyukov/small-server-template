import { StatusCodes } from 'http-status-codes';

import type { RequestHandler } from 'express';

import type Book from '../../db/entities/Book';
import db from '../../db';

type BodyType = Record<string, never>;

type ParamsType = {
  bookId: number;
};

type QueryType = Record<string, never>;

type ResponseType = {
  book: Book;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const getBooks: HandlerType = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const book = await db.books.findOne({ where: { id: bookId } });
    res.status(StatusCodes.OK).json({ book });
  } catch (error) {
    next(error);
  }
};

export default getBooks;
