import express from 'express';

import type { Router } from 'express';

import { getRouter } from '../utils';

const appRouter = getRouter();

const routes = express.Router();

routes.use('/user', appRouter.userRoutes as Router);

routes.use('/auth', appRouter.authRoutes as Router);

routes.use('/books', appRouter.bookRoutes as Router);

export default routes;
