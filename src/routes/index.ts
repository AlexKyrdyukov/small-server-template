import express from 'express';
import userRouter from './userRoutes';
import authRouter from './authRoutes';

const routes = express.Router();

routes.use('/user', userRouter);
routes.use('/auth', authRouter);

export default routes;
