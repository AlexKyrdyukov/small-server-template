import express from 'express';

import { bookControllers } from '../controllers';

const routes = express.Router();

routes.get('/filtered-books', bookControllers.filtered);

routes.get('/:bookId', bookControllers.getById);

export default routes;
