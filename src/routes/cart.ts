import express from 'express';

import { cartControllers } from '../controllers';
import authMidlleware from '../middlewares/auth';

const routes = express.Router();

routes.use(authMidlleware);

routes.get('/get-all', cartControllers.getAll);

routes.post('/:userId/add-book-to-cart', cartControllers.addById);

routes.delete('/:userId/delete-from-cart', cartControllers.deleteById);

routes.post('/:userId/adding-quantity', cartControllers.addingQuantity);

routes.delete('/:userId/delete-quantity', cartControllers.decreaseQuantity);

export default routes;
