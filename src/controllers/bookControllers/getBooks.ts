import { StatusCodes } from 'http-status-codes';

import type { RequestHandler } from 'express';

import type Book from '../../db/entities/Book';
import db from '../../db';

type BodyType = Record<string, never>;

type ParamsType = Record<string, never>;

type QueryType = Record<string, never>;

type ResponseType = {
  books: Book[];
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const getUserData: HandlerType = async (req, res, next) => {
  try {
    const books = await db.books.find({ where: {} });
    res.status(StatusCodes.OK).json({ books });
  } catch (error) {
    next(error);
  }
};

export default getUserData;
