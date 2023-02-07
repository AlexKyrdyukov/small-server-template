import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { BooksEntity } from '../../db';

import { bookService } from '../../services';

type BodyType = Record<string, never>;

type ParamsType = Record<string, never>;

type QueryType = {
  sortDirection: 'ASC' | 'DESC';
  sortBy: string;
  perPage: string;
  page: string;
  search: string;
  genres: string;
  minPrice: string;
  maxPrice: string;
};

type ResponseType = {
  books: BooksEntity[];
  numberOfPage: string;
  totalBooks: number;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const filtered: HandlerType = async (req, res, next) => {
  try {
    const params = req.query;
    const { books, totalBooks, numberOfPage } = await bookService.getFiltered(params);
    res.status(StatusCodes.OK).json({ books, totalBooks, numberOfPage });
  } catch (error) {
    next(error);
  }
};

export default filtered;
