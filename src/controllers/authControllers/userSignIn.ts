import { StatusCodes } from 'http-status-codes';

import type { RequestHandler } from 'express';
import type UserType from '../../db/entities/User';

import CustomError from '../../utils/CustomError';
import tokenHelper from '../../utils/tokenHelper';
import hashHelper from '../../utils/hashHelper';
import errorText from '../../utils/errorMessages';
import db from '../../db';

type BodyType = {
  email: string;
  password: string;
};

type ParamsType = Record<string, never>;

type QueryType = Record<string, never>;

type ResponseType = {
  user: UserType;
  token: string;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const signInUser: HandlerType = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await db.user
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();

    if (!user) {
      throw new CustomError(StatusCodes.BAD_REQUEST, errorText.USER_NOT_FOUND);
    }

    const passwordVerification = hashHelper.checkPassword(password, user.password);
    delete user.password;
    if (!passwordVerification) {
      throw new CustomError(StatusCodes.BAD_REQUEST, errorText.USER_INVALID_PASSWORD);
    }

    const token = await tokenHelper.create(user.userId);

    res.status(StatusCodes.OK).json({ user, token });
  } catch (error) {
    next(error);
  }
};

export default signInUser;
