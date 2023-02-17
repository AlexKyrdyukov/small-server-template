import express from 'express';

import { authControllers } from '../controllers';
import authMidlleware from '../middlewares/auth';
import { authSchema } from '../validationSchemas';
import generatorValidate from '../middlewares/createValidation';

const routes = express.Router();

routes.get('/me', authMidlleware, authControllers.getUser);

routes.post('/refresh', generatorValidate(authSchema.refresh), authControllers.refresh);

routes.post('/sign-in', generatorValidate(authSchema.signIn), authControllers.signIn);

routes.post('/sign-up', generatorValidate(authSchema.signUp), authControllers.signUp);

export default routes;
