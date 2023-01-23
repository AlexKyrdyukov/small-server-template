import { StatusCodes } from 'http-status-codes';

import type { RequestHandler } from 'express';

import db from '../../db';

import type { BooksEntity } from '../../db';

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
    const book = await db.books.findOne({ where: { bookId } });
    res.status(StatusCodes.OK).json({ book });
  } catch (error) {
    next(error);
  }
};

export default getBook;
