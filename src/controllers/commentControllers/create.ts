import { StatusCodes } from 'http-status-codes';
import type { RequestHandler } from 'express';
import { commentService, userService } from '../../services';
import type { BooksEntity } from '../../db';

type BodyType = Record<string, never>;

type ParamsType = Record<string, never>;
type QueryType = Record<string, never>;

type ResponseType = {
  message: string;
  book: BooksEntity;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const createComment: HandlerType = async (req, res, next) => {
  try {
    const { bookId, comment } = req.body;
    const { userId } = req.params;

    userService.checkById(req.user, userId);
    const book = await commentService.create(bookId, comment, req.user);
    res.status(StatusCodes.OK).json({ message: 'comment succesfully added', book });
  } catch (error) {
    next(error);
  }
};

export default createComment;
