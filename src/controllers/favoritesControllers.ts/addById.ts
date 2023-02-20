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
    const { bookId } = req.body;
    const favoriteBook = await favoritesService.addById(bookId, req.user);

    res.status(StatusCodes.OK).json({ favoriteBook });
  } catch (error) {
    next(error);
  }
};

export default addById;
