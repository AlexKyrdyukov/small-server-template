import type { RequestHandler } from 'express';

import { StatusCodes } from 'http-status-codes';

import db, { UsersEntity } from '../../db';

import { CustomError, errorMessages, tokenHelpers, hashHelpers } from '../../utils';

type BodyType = UsersEntity;

type ParamsType = Record<string, never>;

type QueryType = Record<string, never>;

type ResponseType = {
  message: string;
  user: UsersEntity;
  token: string | unknown; // change type
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
      throw new CustomError(StatusCodes.BAD_REQUEST, errorMessages.USER_ALREADY_EXISTS);
    }

    const newUser = new UsersEntity();
    newUser.email = req.body.email;
    newUser.password = hashHelpers.hashPassword(req.body.password);
    const user = await db.user.save(newUser);
    delete user.password;

    const token = await tokenHelpers.create(user.userId);
    res.status(StatusCodes.CREATED).json({ message: 'user successfully registered', user, token });
  } catch (error) {
    next(error);
  }
};

export default signUpUser;
