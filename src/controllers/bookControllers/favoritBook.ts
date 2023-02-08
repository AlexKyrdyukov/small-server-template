import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { UsersEntity } from '../../db';
import { userService } from '../../services';

type BodyType = Record<string, never>;

type ParamsType = Record<string, never>;
type QueryType = Record<string, never>;

type ResponseType = {
  message: string;
  user: UsersEntity;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const favoritBook: HandlerType = async (req, res, next) => {
  try {
    const { userId, bookId } = req.body;
    userService.checkById(req.user, userId);
    const favoritArray = await userService.checkLikeBook(Number(bookId), req.user.likeBooks);
    const user = await userService.update({ likeBooks: favoritArray }, req.user);
    res.status(StatusCodes.OK).json({ message: 'data succesfully updated', user });
  } catch (error) {
    next(error);
  }
};

export default favoritBook;
