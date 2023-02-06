import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { BooksEntity } from '../../db';

import { bookService } from '../../services';

type BodyType = Record<string, never>;

type ParamsType = Record<string, never>;

type QueryType = Record<string, never>;

type ResponseType = {
  books: BooksEntity[];
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const filtered: HandlerType = async (req, res, next) => {
  try {
    console.log(req.query);
    const books = await bookService.getFiltered();
    res.status(StatusCodes.OK).json({ books });
  } catch (error) {
    next(error);
  }
};

export default filtered;
