import express from 'express';

import type { Router } from 'express';

import { getRouter } from '../utils';

const { userRoutes, authRoutes, bookRoutes } = getRouter();

const routes = express.Router();

routes.use('/user', userRoutes as Router);

routes.use('/auth', authRoutes as Router);

routes.use('/books', bookRoutes as Router);

export default routes;
