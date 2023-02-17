import express from 'express';

import { bookControllers } from '../controllers';
import { bookSchemas } from '../validationSchemas';
import generatorValidate from '../middlewares/createValidation';

const routes = express.Router();

routes.get('/', generatorValidate(bookSchemas.filtered), bookControllers.filtered);

routes.get('/:bookId', generatorValidate(bookSchemas.getById), bookControllers.getById);

export default routes;
