import type { Router } from 'express';
/* eslint-disable import/no-import-module-exports */
import express, { Application } from 'express';

import type { RequireDirectoryResult } from 'require-directory';
import requireDirectory from 'require-directory';

// eslint-disable-next-line @typescript-eslint/ban-types
type RouteType = {
  [key: string]: DefaultType;
};

type StackType = {
  stack?: unknown;
};

type DefaultType = {
  default?: StackType;
};

const modules = requireDirectory(module, { extensions: ['ts'] });
const obj: RouteType = {};
for (const [key, value] of Object.entries(modules)) {
  obj[key] = value;
}
console.log(obj.authRoutes.default);
export const routes = express.Router();

routes.use('/user', obj.userRoutes?.default as Router);

routes.use('/auth', obj.authRouter?.default as Router);

routes.use('/books', obj.bookRouter?.default as Router);
