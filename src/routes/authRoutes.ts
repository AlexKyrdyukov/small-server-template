import express from 'express';
import { check } from 'express-validator';

import authController from '../controllers/authControllers';

const routes = express.Router();

routes.post('/login', authController.userLogIn);

routes.post('/signup', [
  check('fullName', 'this field cannot be empty').trim().notEmpty(),
  check('email', 'this field cannot be empty').trim().notEmpty(),
  check('password', `password must be no more than 10 
    and at least 3 characters`).trim().isLength({ min: 3, max: 10 }),
  check('dob', 'this field cannot be empty').trim().notEmpty(),
], authController.userSignUp);

export default routes;
