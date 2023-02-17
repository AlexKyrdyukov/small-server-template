import express from 'express';

import authMiddleware from '../middlewares/auth';
import { favoritesControllers } from '../controllers';
import { favoritesSchema } from '../validationSchemas';
import generatorValidate from '../middlewares/createValidation';

const routes = express.Router();

routes.use(authMiddleware);

routes.get('/', favoritesControllers.getAll);

routes.post('/add', generatorValidate(favoritesSchema.addById), favoritesControllers.addById);

routes.delete('/delete', generatorValidate(favoritesSchema.deleteById), favoritesControllers.deleteById);

export default routes;
