import type { RequestHandler } from 'express';

import type { BooksEntity } from '../../db';

type BodyType = Record<string, never>;

type ParamsType = Record<string, never>;

type QueryType = Record<string, never>;

type ResponseType = {
  books: BooksEntity[];
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const filtered: HandlerType = async (req, res, next) => {
  try {
    console.log(req.params);
    console.log(req.body);
    console.log(req.query);
  } catch (error) {
    next(error);
  }
};

export default filtered;
