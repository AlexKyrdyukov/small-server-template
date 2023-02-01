import express from 'express';
import { genresControllers } from '../controllers';

const routes = express.Router();

routes.get('/get-all', genresControllers.getAll);
