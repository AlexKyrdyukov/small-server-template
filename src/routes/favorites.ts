import express from 'express';

import authMiddleware from '../middlewares/auth';
import { favoritesControllers } from '../controllers';

const routes = express.Router();

routes.use(authMiddleware);

routes.get('/', favoritesControllers.getAll);

routes.post('/add', favoritesControllers.addById);

routes.delete('/remove', favoritesControllers.deleteById);

export default routes;
