// import CryptoJS from 'crypto-js';
// import jwt from 'jsonwebtoken';
import type { RequestHandler } from 'express';

import type UserType from '../../db/entities/User';
// import repository from '../../db/index';
// import config from '../../config';

type BodyType = {
  email: string;
  password: string;
};

type ParamsType = Record<string, never>;

type QueryType = Record<string, never>;

type ResponseType = {
  // message: string;
  // userInfo?: UserType;
  user: UserType;
  token: string;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const loginUser: HandlerType = async (req, res, next) => {
  try {
    // const { email, password } = req.body;

    // const user = await repository.userRepository.findOne({
    //   where: {
    //     email,
    //   },
    // });

    // if (!user) {}
    // const hashPassword = CryptoJS.SHA512(password + config.hash.salt).toString();
    // if (user.password !== hashPassword) { }

    // eslint-disable-next-line max-len
    // const token = jwt.sign({ id: user.id }, config.token.secret, { algorithm: 'HS512', expiresIn: '1h' });

    // const userInfo = {
    //   fullName: user.fullName,
    //   dob: user.dob,
    //   email: user.email,
    //   token,
    // };

    // res.json({ userInfo });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export default loginUser;
