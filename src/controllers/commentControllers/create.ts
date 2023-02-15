import { StatusCodes } from 'http-status-codes';

import type { RequestHandler } from 'express';
import type { CommentsEntity } from '../../db';

import { commentService, userService } from '../../services';

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
    const { userId } = req.params;

    userService.checkById(req.user, userId);
    await commentService.create(bookId, comment, req.user);
    const comments = await commentService.getById(bookId);

    res.status(StatusCodes.OK).json({ message: 'comment succesfully added', comments });
  } catch (error) {
    next(error);
  }
};

export default createComment;
