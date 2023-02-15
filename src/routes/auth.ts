import express from 'express';

import { authControllers } from '../controllers';
import version from '../validationSchemas/auth';
import authMidlleware from '../middlewares/auth';
import generatorValidate from '../middlewares/createValidation';

const routes = express.Router();

routes.post('/refresh', authControllers.refresh);

routes.get('/me', authMidlleware, authControllers.getUser);

routes.post('/sign-in', generatorValidate(version.signIn), authControllers.signIn);

routes.post('/sign-up', generatorValidate(version.signUp), authControllers.signUp);

export default routes;
