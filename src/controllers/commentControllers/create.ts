import { StatusCodes } from 'http-status-codes';

import type { RequestHandler } from 'express';
import type { CommentsEntity } from '../../db';
import { io } from '../../app';

import { commentService } from '../../services';

type BodyType = Record<string, never>;
type ParamsType = Record<string, never>;
type QueryType = Record<string, never>;

type ResponseType = {
  message: string;
  comments: CommentsEntity[];
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const createComment: HandlerType = async (req, res, next) => {
  try {
    const { bookId, comment } = req.body;

    await commentService.create(bookId, comment, req.user);
    const comments = await commentService.getById(bookId);
    io.emit('new-comment', { comments });
    res.status(StatusCodes.OK).json({ message: 'comment succesfully added', comments });
  } catch (error) {
    next(error);
  }
};

export default createComment;
