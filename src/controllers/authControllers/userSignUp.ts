import { StatusCodes } from 'http-status-codes';

import type { RequestHandler } from 'express';
import type UserType from '../../db/entities/User';

import CustomError from '../../utils/CustomError';
import tokenHelper from '../../utils/tokenHelper';
import hashHelper from '../../utils/hashHelper';
import User from '../../db/entities/User';
import errorText from '../../utils/errorMessages';
import db from '../../db';

type BodyType = UserType;

type ParamsType = Record<string, never>;

type QueryType = Record<string, never>;

type ResponseType = {
  message: string;
  user: UserType;
  token: string;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const signUpUser: HandlerType = async (req, res, next) => {
  try {
    const existenUser = await db.user.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (existenUser) {
      throw new CustomError(StatusCodes.BAD_REQUEST, errorText.USER_ALREADY_EXISTS);
    }

    const newUser = new User();
    newUser.email = req.body.email;
    newUser.password = hashHelper.hashPassword(req.body.password);
    const user = await db.user.save(newUser);
    delete user.password;

    const token = await tokenHelper.create(user.userId);
    res.status(StatusCodes.CREATED).json({ message: 'user successfully registered', user, token });
  } catch (error) {
    next(error);
  }
};

export default signUpUser;
