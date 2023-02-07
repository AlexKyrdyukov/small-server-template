import express from 'express';
import authMiddleware from '../middlewares/auth';

import { bookControllers } from '../controllers';

const routes = express.Router();

routes.get('/filtered-books', bookControllers.filtered);

routes.get('/:bookId', bookControllers.getById);

routes.post('/like-book', authMiddleware, bookControllers.like);

export default routes;
