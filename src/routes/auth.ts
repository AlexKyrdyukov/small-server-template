import express from 'express';

import { authControllers } from '../controllers';
import authMidlleware from '../middlewares/auth';
import { authSchemas } from '../validationSchemas';
import generatorValidate from '../middlewares/createValidation';

const routes = express.Router();

routes.get('/me', authMidlleware, authControllers.getUser);

routes.post('/refresh', generatorValidate(authSchemas.refresh), authControllers.refresh);

routes.post('/sign-in', generatorValidate(authSchemas.signIn), authControllers.signIn);

routes.post('/sign-up', generatorValidate(authSchemas.signUp), authControllers.signUp);

export default routes;
