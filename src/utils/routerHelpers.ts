import requireDirectory from 'require-directory';

import type { RequireDirectoryResult } from 'require-directory';
import type { Router } from 'express';

type RouteType = {
  [key: string]: DefaultType;
};

type DefaultType = {
  default?: Router;
};

type ModulesType = RequireDirectoryResult<RouteType>;

const getRouter = () => {
  const obj: RouteType = {};
  const check = (path: string) => {
    if (/index\.ts$/.test(path)) {
      return true;
    }
  };

  const modules: ModulesType = requireDirectory(module, '../routes', { extensions: ['ts'], exclude: check });
  for (const [key, value] of Object.entries(modules)) {
    obj[key] = value.default;
  }
  return obj;
};

export default getRouter;
