import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import type { UsersEntity } from '../../db';

import db from '../../db';

import { CustomError, errorMessages, tokenHelpers, hashHelpers } from '../../utils';

type BodyType = {
  email: string;
  password: string;
};

type ParamsType = Record<string, never>;

type QueryType = Record<string, never>;

type ResponseType = {
  user: UsersEntity;
  token: string;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const signIn: HandlerType = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await db.user
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();

    if (!user) {
      throw new CustomError(StatusCodes.BAD_REQUEST, errorMessages.USER_NOT_FOUND);
    }

    const passwordVerification = hashHelpers.checkPassword(password, user.password);
    delete user.password;
    if (!passwordVerification) {
      throw new CustomError(StatusCodes.BAD_REQUEST, errorMessages.USER_INVALID_PASSWORD);
    }

    const token = await tokenHelpers.create(user.userId);

    res.status(StatusCodes.OK).json({ user, token });
  } catch (error) {
    next(error);
  }
};

export default signIn;
