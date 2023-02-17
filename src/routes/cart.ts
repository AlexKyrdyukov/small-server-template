import express from 'express';

import { cartControllers } from '../controllers';
import { cartSchema } from '../validationSchemas';
import authMidlleware from '../middlewares/auth';
import generatorValidate from '../middlewares/createValidation';

const routes = express.Router();

routes.use(authMidlleware);

routes.get('/', cartControllers.getAll);

routes.post('/add', generatorValidate(cartSchema.changeById), cartControllers.addById);

routes.delete('/delete', generatorValidate(cartSchema.changeById), cartControllers.deleteById);

routes.patch('/update', generatorValidate(cartSchema.changeQuantity), cartControllers.changeQuantity);

export default routes;
