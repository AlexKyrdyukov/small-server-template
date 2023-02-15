import express from 'express';

import { bookControllers } from '../controllers';
import authMiddleware from '../middlewares/auth';

const routes = express.Router();

routes.get('/filtered-books', bookControllers.filtered);

routes.get('/:bookId', bookControllers.getById);

routes.post('/like-book', authMiddleware, bookControllers.favorites);

routes.post('/rating', authMiddleware, bookControllers.changeRating);

export default routes;
