import { validationResult } from 'express-validator';
import CryptoJS from 'crypto-js';

import jwt from 'jsonwebtoken';

import type { Handler } from 'express';
import repository from '../../db/index';
import config from '../../config';

const loginUser: Handler = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'errors authentication', errors });
    }
    const { email, password } = req.body;

    const user = await repository.userRepository.findOne({ where: {
      email,
    } });

    if (!user) {
      return res.status(400).json({ message: 'user with this email not found' });
    }
    const hashPassword = CryptoJS.SHA512(password + config.hashProperty.hashSalt).toString();

    if (user.password !== hashPassword) {
      return res.status(400).json({ message: 'errors authentication', errors });
    }

    const token = jwt.sign({ id: user.id }, config.tokenProperty.tokenSecret, { algorithm: 'HS512', expiresIn: '1h' });

    const userInfo = {
      fullName: user.fullName,
      dob: user.dob,
      email: user.email,
      token,
    };

    res.status(200).json({ message: 'usersignIn', userInfo });
  } catch (error) {
    console.error(error);
  }
};

export default loginUser;
