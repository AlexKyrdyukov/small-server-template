import { StatusCodes } from 'http-status-codes';
import fs from 'fs';

import type { RequestHandler } from 'express';
import { randomUUID } from 'crypto';
import type UserType from '../../db/entities/User';

import CustomError from '../../exceptions/CustomError';
import errorText from '../../utils/consts/error';
import db from '../../db';

type BodyType = {
  file: string;
};

type ParamsType = Record<string, never>;

type QueryType = Record<string, never>;

type ResponseType = {
  message: string;
  avatar: UserType['avatar'];
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const loadAvatar: HandlerType = async (req, res, next) => {
  try {
    if (req.user.id !== +req.params.userId) {
      throw new CustomError(StatusCodes.FORBIDDEN, errorText.USER_INVALID_REQUEST);
    }
    const file = Buffer.from(req.body.file, 'base64');
    const avatarName = `${randomUUID()}.svg`;

    fs.writeFileSync(`public/static/${avatarName}`, file);
    req.user.avatar = avatarName;

    await db.user.save(req.user);
    res.status(StatusCodes.OK).json({ message: 'data succesfully updated', avatar: req.user.avatar });
  } catch (error) {
    next(error);
  }
};

export default loadAvatar;
