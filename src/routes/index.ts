import express from 'express';

import userRouter from './userRoutes';
import authRouter from './authRoutes';
import booksRouter from './booksRoutes';

const routes = express.Router();

routes.use('/user', userRouter);
routes.use('/auth', authRouter);
routes.use('/books', booksRouter);

export default routes;
