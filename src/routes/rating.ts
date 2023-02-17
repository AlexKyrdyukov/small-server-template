import express from 'express';
import { ratingControllers } from '../controllers';

import authMiddleware from '../middlewares/auth';
import { ratingSchema } from '../validationSchemas';
import generatorValidate from '../middlewares/createValidation';

const routes = express.Router();

routes.post('/', authMiddleware, generatorValidate(ratingSchema.change), ratingControllers.setRating);

export default routes;
