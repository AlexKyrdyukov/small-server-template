import express from 'express';

import { userControllers } from '../controllers';
import authMiddleware from '../middlewares/auth';
import { userSchemas } from '../validationSchemas';
import generatorValidate from '../middlewares/createValidation';

const routes = express.Router();

routes.use(authMiddleware);

routes.delete('/:userId', generatorValidate(userSchemas.deleteUser), userControllers.remove);

routes.patch('/:userId', generatorValidate(userSchemas.updatedUser), userControllers.update);

routes.post('/:userId/avatar', generatorValidate(userSchemas.loadAvatar), userControllers.loadAvatar);

routes.patch('/:userId/password', generatorValidate(userSchemas.updatedPass), userControllers.updatePass);

export default routes;
