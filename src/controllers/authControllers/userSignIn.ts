import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';

import type { RequestHandler } from 'express';
import type UserType from '../../db/entities/User';
import repository from '../../db/index';
import config from '../../config';

type BodyType = {
  email: string;
  password: string;
};

type ParamsType = Record<string, never>;

type QueryType = Record<string, never>;

type ResponseType = {
  message: string;
  userInfo?: UserType;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const loginUser: HandlerType = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await repository.userRepository.findOne({ where: {
      email,
    } });

    if (!user) {
      return res.status(400).json({ message: 'user with this email not found' });
    }
    const hashPassword = CryptoJS.SHA512(password + config.hashProperty.hashSalt).toString();

    if (user.password !== hashPassword) {
      return res.status(400).json({ message: 'errors authentication' });
    }

    const token = jwt.sign({ id: user.id }, config.tokenProperty.tokenSecret, { algorithm: 'HS512', expiresIn: '1h' });

    const userInfo = {
      fullName: user.fullName,
      dob: user.dob,
      email: user.email,
      token,
    };

    res.status(200).json({ message: 'user signIn', userInfo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'please repeat request in a few minutes' });
  }
};

export default loginUser;
