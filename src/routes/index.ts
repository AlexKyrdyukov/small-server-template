import express from 'express';
import requireDirectory from 'require-directory';

import userRouter from './userRoutes';
import authRouter from './authRoutes';
import booksRouter from './booksRoutes';

const route = requireDirectory(module);

// eslint-disable-next-line no-console
// console.log(route, userRouter.stack[1]);
const routes = express.Router();

routes.use('/user', userRouter);

routes.use('/auth', authRouter);

routes.use('/books', booksRouter);

export default routes;
