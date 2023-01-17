import express from 'express';

import booksControllers from '../controllers/bookControllers';

const routes = express();

routes.get('/', booksControllers.getBooks);
routes.get('/:bookId', booksControllers.getBooksById);

export default routes;
