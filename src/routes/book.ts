import express from 'express';

import { bookControllers } from '../controllers';

const routes = express.Router();

routes.get('/:bookId/book', bookControllers.getById);

routes.get('/filtered-books', bookControllers.filtered);

export default routes;
