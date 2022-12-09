import { StatusCodes } from 'http-status-codes';

import type { RequestHandler } from 'express';
import type UserType from '../../db/entities/User';

import CustomError from '../../exceptions/CustomError';
import tokenWorker from '../../utils/tokenHelper';
import hashWorker from '../../utils/hashHelper';
import User from '../../db/entities/User';
import dB from '../../db';

type BodyType = UserType;

type ParamsType = Record<string, never>;

type QueryType = Record<string, never>;

type ResponseType = {
  message: string;
  user: UserType;
  token: string;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const signupUser: HandlerType = async (req, res, next) => {
  try {
    const userDb = await dB.user.findOne({ where: {
      email: req.body.email,
    } });

    if (userDb) {
      throw new CustomError(StatusCodes.BAD_REQUEST, 'user with this email already exists please enter correct data');
    }

    const newUser = new User();
    newUser.fullName = req.body.fullName;
    newUser.email = req.body.email;
    newUser.password = hashWorker.hashPassword(req.body.password);
    newUser.dob = req.body.dob;

    const user = await dB.user.save(newUser);
    delete user.password;

    const token = tokenWorker.create(user.id);
    res.status(StatusCodes.CREATED).json({ message: 'user successfully registered', user, token });
  } catch (error) {
    next(error);
  }
};

export default signupUser;
