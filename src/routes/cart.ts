import express from 'express';

import { cartControllers } from '../controllers';
import { cartSchemas } from '../validationSchemas';
import authMidlleware from '../middlewares/auth';
import generatorValidate from '../middlewares/createValidation';

const routes = express.Router();

routes.use(authMidlleware);

routes.get('/', cartControllers.getAll);

routes.post('/add', generatorValidate(cartSchemas.changeById), cartControllers.addById);

routes.delete('/:bookId', generatorValidate(cartSchemas.changeById), cartControllers.deleteById);

routes.patch('/:bookId', generatorValidate(cartSchemas.changeQuantity), cartControllers.changeQuantity);

export default routes;
