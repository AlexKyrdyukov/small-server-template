import express from 'express';

import authMidlleware from '../middlewares/auth';

import { cartControllers } from '../controllers';

const routes = express.Router();

routes.use(authMidlleware);

routes.get('/get-all', cartControllers.getAll);

routes.post('/:userId/adding-quantity', cartControllers.addingQuantity);

routes.delete('/:userId/delete-quantity', cartControllers.decreaseQuantity);

routes.post('/:userId/add-book-to-cart', cartControllers.addById);

routes.delete('/:userId/delete-from-cart', cartControllers.deleteById);

export default routes;
