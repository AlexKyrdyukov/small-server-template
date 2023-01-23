import express from 'express';

import { bookControllers } from '../controllers';

const routes = express.Router();

routes.get('/get-all', bookControllers.getAll);

routes.get('/:bookId/book', bookControllers.getById);

export default routes;
