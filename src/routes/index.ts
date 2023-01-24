import express from 'express';
import requireDirectory from 'require-directory';
import { paramCase } from 'change-case';

import type { RequireDirectoryResult } from 'require-directory';
import type { Router } from 'express';

type RouteType = {
  default?: Router;
};

type ModulesType = RequireDirectoryResult<RouteType>;

const modules: ModulesType = requireDirectory(module, {
  extensions: [__filename.slice(-2)],
  rename: (name: string) => {
    return paramCase(name);
  },
});

const routes = express.Router();

Object.entries(modules).forEach(([path, route]) => {
  routes.use(`/${path}`, route.default as Router);
});

export default routes;
