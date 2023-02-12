import express from 'express';

import authMidlleware from '../middlewares/auth';

import { cartControllers } from '../controllers';

const routes = express.Router();

routes.use(authMidlleware);

routes.get('/get-all', cartControllers.getAll);

routes.post('/:userId/adding-quantity', cartControllers.addingQuantity);

routes.post('/:userId/delete-quantity', cartControllers.deleteQuantity);

routes.post('/:userId/add-book-to-cart', cartControllers.addById);

routes.delete('/:userId/delete-from-to-cart', cartControllers.deleteById);

export default routes;
