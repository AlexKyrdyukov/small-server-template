import express from 'express';

import authControllers from '../controllers/authControllers';
import userSchema from '../validationSchemas/userSchema';
import generatorValidate from '../middlewares/generatorSchemas';
import authMidlleware from '../middlewares/auth';

const routes = express.Router();

routes.post('/sign-in', generatorValidate(userSchema.signIn), authControllers.userSignIn);

routes.post('/sign-up', generatorValidate(userSchema.signUp), authControllers.userSignUp);

routes.use(authMidlleware);

routes.get('/me', authControllers.getUser);

export default routes;
