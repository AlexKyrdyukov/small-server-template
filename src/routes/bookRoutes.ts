import express from 'express';

import { bookControllers } from '../controllers';

const routes = express.Router();

routes.get('/', bookControllers.getAll);

routes.get('/:bookId', bookControllers.getById);

export default routes;
