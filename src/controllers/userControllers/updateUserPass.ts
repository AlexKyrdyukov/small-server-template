import { StatusCodes } from 'http-status-codes';

import type { RequestHandler } from 'express';

import CustomError from '../../exceptions/CustomError';
import hashHelper from '../../utils/hashHelper';
import db from '../../db';

type BodyType = {
  password: string;
  newPassword: string;
};

type ParamsType = Record<string, never>;

type QueryType = Record<string, never>;

type ResponseType = {
  message: string;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const updateUserPass: HandlerType = async (req, res, next) => {
  try {
    if (req.user.id !== +req.params.userId) {
      throw new CustomError(StatusCodes.FORBIDDEN, 'invalid request, please check entered data');
    }
    const { password, newPassword } = req.body;
    const user = await db.user
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.id = :id', { id: req.user.id })
      .getOne();

    const flag = hashHelper.checkPassword(password, user.password);
    if (!flag) {
      throw new CustomError(StatusCodes.BAD_REQUEST, 'password invalid, please enter correct passwpord, and repeat request ');
    }
    user.password = hashHelper.hashPassword(newPassword);
    await db.user.save(user);
    res.status(StatusCodes.OK).json({ message: 'new password succesfully updated' });
  } catch (error) {
    next(error);
  }
};

export default updateUserPass;
