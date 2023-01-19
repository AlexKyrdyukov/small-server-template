import { StatusCodes } from 'http-status-codes';

import type { RequestHandler } from 'express';

import db from '../../db';

import type { BooksEntity } from '../../db';

type BodyType = Record<string, never>;

type ParamsType = Record<string, never>;

type QueryType = Record<string, never>;

type ResponseType = {
  books: BooksEntity[];
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const getBooks: HandlerType = async (req, res, next) => {
  try {
    const books = await db.books.find({ where: {} });
    res.status(StatusCodes.OK).json({ books });
  } catch (error) {
    next(error);
  }
};

export default getBooks;
