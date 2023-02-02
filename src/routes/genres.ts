import express from 'express';
import { genresControllers } from '../controllers';

const routes = express.Router();

routes.get('/get-all-genres', genresControllers.getAll);

export default routes;
