/* eslint-disable import/no-import-module-exports */
import express from 'express';

import { userControllers } from '../controllers';
import authMiddleware from '../middlewares/auth';
import version from '../validationSchemas/user';
import createValidationMiddleware from '../middlewares/createValidation';

const routes = express.Router();

routes.use(authMiddleware);

routes.delete('/:userId', createValidationMiddleware(version.deleteUser), userControllers.remove);

routes.patch('/:userId', createValidationMiddleware(version.updatedUser), userControllers.update);

routes.patch('/:userId/password', createValidationMiddleware(version.updatedPass), userControllers.updatePass);

routes.post('/:userId/avatar', createValidationMiddleware(version.loadAvatar), userControllers.loadAvatar);

export default routes;
