import { StatusCodes } from 'http-status-codes';

import type { RequestHandler } from 'express';
import type { GenresEntity } from '../../db';

import { genresService } from '../../services';

type BodyType = Record<string, never>;
type ParamsType = Record<string, never>;
type QueryType = Record<string, never>;

type ResponseType = {
  genres: GenresEntity[];
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const getAll: HandlerType = async (req, res, next) => {
  try {
    const genres = await genresService.getAll();

    res.status(StatusCodes.OK).json({ genres });
  } catch (error) {
    next(error);
  }
};

export default getAll;
