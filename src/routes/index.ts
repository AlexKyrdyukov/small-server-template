import express from 'express';
import requireDirectory from 'require-directory';
import { paramCase } from 'change-case';
import type { Router } from 'express';

const modules = requireDirectory(module, {
  extensions: [__filename.slice(-2)],
  rename: (name) => {
    return paramCase(name);
  },
}) as Record<string, { default: Router }>;

const routes = express.Router();

Object.entries(modules).forEach(([path, route]) => {
  routes.use(`/${path}`, route.default);
});

export default routes;
