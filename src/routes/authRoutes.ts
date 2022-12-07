import express from 'express';

import validate from '../middlewares/validationMiddleware';
import authController from '../controllers/authControllers';
import userSchema from '../validationSchemas/userSchemas';

const routes = express.Router();

routes.post('/signin', validate(userSchema.validationSchema), authController.userSignIn);

routes.post('/signup', validate(userSchema.registarationSchema), authController.userSignUp);

export default routes;
