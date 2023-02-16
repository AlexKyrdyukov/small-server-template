import express from 'express';

import { genresControllers } from '../controllers';

const routes = express.Router();

routes.get('/', genresControllers.getAll);

export default routes;
