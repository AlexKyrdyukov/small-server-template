import express from 'express';

import authController from '../controllers/authControllers';
import userSchema from '../validationSchemas/userSchema';
import generatorValidate from '../middlewares/validationMiddleware';

const routes = express.Router();

routes.post('/sign-in', generatorValidate(userSchema.signIn), authController.userSignIn);

routes.post('/sign-up', generatorValidate(userSchema.signUp), authController.userSignUp);

// routes.get('/me');

export default routes;
