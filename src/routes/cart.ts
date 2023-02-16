import express from 'express';

import { cartControllers } from '../controllers';
import authMidlleware from '../middlewares/auth';

const routes = express.Router();

routes.use(authMidlleware);

routes.get('/', cartControllers.getAll);

routes.post('/add', cartControllers.addById);

routes.delete('/delete', cartControllers.deleteById);

routes.patch('/update', cartControllers.changeQuantity);

export default routes;
