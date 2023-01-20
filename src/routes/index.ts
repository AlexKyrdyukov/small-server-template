import express from 'express';

import userRouter from './userRoutes';
import bookRouter from './bookRoutes';
import authRouter from './authRoutes';

export const routes = express.Router();

routes.use('/user', userRouter);

routes.use('/auth', authRouter);

routes.use('/books', bookRouter);
