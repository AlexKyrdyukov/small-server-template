import express from 'express';

import type { Router } from 'express';

import { getRouter } from '../utils';

const router = getRouter();

const routes = express.Router();

Object.entries(router).forEach(([path, route]) => {
  routes.use(path, route as Router);
});

export default routes;
