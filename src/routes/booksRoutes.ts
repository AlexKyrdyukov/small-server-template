import express from 'express';

import { bookControllers } from '../controllers';

const routes = express();

routes.get('/', bookControllers.getAll);

routes.get('/:bookId', bookControllers.getById);

export default routes;
