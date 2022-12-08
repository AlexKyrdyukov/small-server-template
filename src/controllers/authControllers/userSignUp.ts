import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';
import type { RequestHandler } from 'express';

import User from '../../db/entities/User';
import type UserType from '../../db/entities/User';

import repository from '../../db/index';
import config from '../../config';

type BodyType = UserType;

type ParamsType = Record<string, never>;

type QueryType = Record<string, never>;

type ResponseType = {
  message: string;
  userInfo?: UserType;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const signupUser: HandlerType = async (req, res, next) => {
  try {
    const user = await repository.userRepository.findOne({ where: {
      email: req.body.email,
    } });

    if (user) {
      return res.status(400).json({ message: 'user with this email already exists' });
    }

    const newUser = new User();
    newUser.fullName = req.body.fullName;
    newUser.email = req.body.email;
    newUser.password = CryptoJS.SHA512(req.body.password + config.hashProperty.hashSalt).toString();
    newUser.dob = req.body.dob;

    const saveUser = await repository.userRepository.save(newUser);

    const token = jwt.sign({ id: saveUser.id }, config.tokenProperty.tokenSecret, { algorithm: 'HS512', expiresIn: '1h' });

    const userInfo = {
      fullName: saveUser.fullName,
      dob: saveUser.dob,
      email: saveUser.email,
      token,
    };

    res.status(200).json({ message: 'user successfully registered', userInfo });
  } catch (error) {
    next(error);
  }
};

export default signupUser;
