import { StatusCodes } from 'http-status-codes';

import type { RequestHandler } from 'express';
import { favoritesService } from '../../services';
import type { BooksEntity } from '../../db';

type BodyType = Record<string, never>;

type ParamsType = Record<string, never>;

type QueryType = Record<string, never>;

type ResponseType = Record<string, BooksEntity>;

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const addById: HandlerType = async (req, res, next) => {
  try {
    // eslint-disable-next-line no-console
    console.log('favorites, add', req.body, req.params, req.query);
    const { bookId } = req.body;

    const book = await favoritesService.setById(bookId, req.user);
    res.status(StatusCodes.OK).json({ book });
  } catch (error) {
    next(error);
  }
};

export default addById;
