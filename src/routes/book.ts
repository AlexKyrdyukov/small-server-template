import express from 'express';

import { bookControllers } from '../controllers';
import { bookSchema } from '../validationSchemas';
import generatorValidate from '../middlewares/createValidation';

const routes = express.Router();

routes.get('/', generatorValidate(bookSchema.filtered), bookControllers.filtered);

routes.get('/:bookId', generatorValidate(bookSchema.getById), bookControllers.getById);

export default routes;
