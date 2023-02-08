import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { userService } from '../../services';

type BodyType = Record<string, never>;

type ParamsType = Record<string, never>;
type QueryType = Record<string, never>;

type ResponseType = {
  message: string;
  raiting: string;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const changeRaiting: HandlerType = async (req, res, next) => {
  try {
    const { userId, bookId, raiting } = req.body;
    // eslint-disable-next-line no-console
    console.log(userId, bookId, raiting);
    userService.checkById(req.user, userId);
    res.status(StatusCodes.OK).json({ message: 'data succesfully updated', raiting });
  } catch (error) {
    next(error);
  }
};

export default changeRaiting;
