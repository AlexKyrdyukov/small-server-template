import express from 'express';

import { commentControllers } from '../controllers';
import authMidlleware from '../middlewares/auth';
import { commentSchema } from '../validationSchemas';
import generatorValidate from '../middlewares/createValidation';

const routes = express.Router();

routes.use(authMidlleware);

routes.post('/comment', generatorValidate(commentSchema.create), commentControllers.createComment);

export default routes;
