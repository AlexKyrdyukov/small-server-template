import express from 'express';

import { authControllers } from '../controllers';
import generatorValidate from '../middlewares/createValidation';
import version from '../validationSchemas/auth';
import authMidlleware from '../middlewares/auth';

const routes = express.Router();

routes.post('/sign-in', generatorValidate(version.signIn), authControllers.signIn);

routes.post('/sign-up', generatorValidate(version.signUp), authControllers.signUp);

routes.get('/me', authMidlleware, authControllers.getUser);

routes.post('/refresh', authControllers.refresh);

export default routes;
