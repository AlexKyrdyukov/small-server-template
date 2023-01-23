import requireDirectory from 'require-directory';

import { paramCase } from 'change-case';

import type { RequireDirectoryResult } from 'require-directory';
import type { Router } from 'express';

type RouteType = {
  default?: Router;
};

type ModulesType = RequireDirectoryResult<RouteType>;

const getRouter = () => {
  const obj: Record<string, string | unknown> = {};

  const check = (path: string) => {
    if (/index\.ts$/.test(path)) {
      return true;
    }
  };

  const renamer = (name: string) => {
    return paramCase(name);
  };

  const modules: ModulesType = requireDirectory(module, '../routes', {
    extensions: ['ts'], exclude: check, rename: renamer,
  });
  for (const [key, value] of Object.entries(modules)) {
    obj[`/${key}`] = value.default;
  }
  return obj;
};

export default getRouter;
