import express from 'express';
import { ratingControllers } from '../controllers';

import authMiddleware from '../middlewares/auth';
import { ratingSchemas } from '../validationSchemas';
import generatorValidate from '../middlewares/createValidation';

const routes = express.Router();

routes.post('/', authMiddleware, generatorValidate(ratingSchemas.change), ratingControllers.setRating);

export default routes;
