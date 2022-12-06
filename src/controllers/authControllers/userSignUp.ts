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
    res.status(404).json({ message: error });
    console.error(error);
  }
};

export default signupUser;
