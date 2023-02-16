import express from 'express';
import { ratingControllers } from '../controllers';

import authMiddleware from '../middlewares/auth';

const routes = express.Router();

routes.post('/', authMiddleware, ratingControllers.setRating);

export default routes;
