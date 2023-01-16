import express from 'express';

import booksControllers from '../controllers/bookControllers';

const routes = express();

routes.get('/books', booksControllers.getBooks);

export default routes;
