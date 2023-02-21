import { StatusCodes } from 'http-status-codes';

import type { RequestHandler } from 'express';
import { favoritesService } from '../../services';
import type { BooksEntity } from '../../db';

type BodyType = Record<string, never>;

type ParamsType = Record<string, never>;

type QueryType = Record<string, never>;

type ResponseType = Record<string, BooksEntity[]>;

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const getAll: HandlerType = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const favoriteBooks = await favoritesService.getAll(userId);
    res.status(StatusCodes.OK).json({ favoriteBooks });
  } catch (error) {
    next(error);
  }
};

export default getAll;
