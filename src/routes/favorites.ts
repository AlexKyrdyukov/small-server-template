import express from 'express';

import authMiddleware from '../middlewares/auth';
import { favoritesControllers } from '../controllers';
import { favoritesSchemas } from '../validationSchemas';
import generatorValidate from '../middlewares/createValidation';

const routes = express.Router();

routes.use(authMiddleware);

routes.get('/', favoritesControllers.getAll);

routes.post('/add', generatorValidate(favoritesSchemas.addById), favoritesControllers.addById);

routes.delete('/:bookId', generatorValidate(favoritesSchemas.deleteById), favoritesControllers.deleteById);

export default routes;
