import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { BooksEntity } from '../../db';

import { bookService } from '../../services';

type BodyType = Record<string, never>;

type ParamsType = Record<string, never>;

type QueryType= {
  sortDirection: 'ASC' | 'DESC';
  sortBy: string;
  perPage: number;
  page: number;
  search: string;
  genres: string[];
  minPrice: string;
  maxPrice: string;
};

type ResponseType = {
  books: BooksEntity[];
  numberOfBooks: number;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const filtered: HandlerType = async (req, res, next) => {
  try {
    const params = req.query;
    const [books, numberOfBooks] = await bookService.getFiltered(params);
    res.status(StatusCodes.OK).json({ books, numberOfBooks });
  } catch (error) {
    next(error);
  }
};

export default filtered;
