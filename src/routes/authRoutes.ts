import express from 'express';

import authControllers from '../controllers/authControllers';
import version from '../validationSchemas/auth';
import generatorValidate from '../middlewares/createValidation';
import authMidlleware from '../middlewares/auth';

const routes = express.Router();

routes.post('/sign-in', generatorValidate(version.signIn), authControllers.userSignIn);

routes.post('/sign-up', generatorValidate(version.signUp), authControllers.userSignUp);

routes.get('/me', authMidlleware, authControllers.getUser);

export default routes;
