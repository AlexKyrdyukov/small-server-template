import type { Handler } from 'express';
import { validationResult } from 'express-validator';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';
import repository from '../../db/index';
import User from '../../db/entities/User';
import config from '../../config';

const signupUser: Handler = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'errors registation', errors });
    }
    const user = await repository.userRepository.find({ where: {
      email: req.body.email,
    } });
    // eslint-disable-next-line no-console
    console.log(user, req.body.email);
    if (user.length) {
      return res.status(400).json({ message: 'user with this email already exists' });
    }
    const newUser = new User();
    newUser.fullName = req.body.fullName;
    newUser.email = req.body.email;
    newUser.password = CryptoJS.SHA512(req.body.password + config.hashProperty.hashSalt).toString();
    newUser.dob = req.body.dob;
    const userInfo = await repository.userRepository.save(newUser);
    const token = jwt.sign({ id: userInfo.id, email: userInfo.email }, config.tokenProperty.tokenSecret, { algorithm: 'HS512' });
    const returnInfo = {
      fullName: userInfo.fullName,
      dob: userInfo.dob,
      email: userInfo.email,
      token,
    };
    res.status(200).json({ message: 'user successfully registered', returnInfo });
  } catch (error) {
    res.status(404).json({ message: error });
    console.error(error);
  }
};

export default signupUser;
