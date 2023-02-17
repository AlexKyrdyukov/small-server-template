import express from 'express';

import { userControllers } from '../controllers';
import authMiddleware from '../middlewares/auth';
import { userSchema } from '../validationSchemas';
import generatorValidate from '../middlewares/createValidation';

const routes = express.Router();

routes.use(authMiddleware);

routes.delete('/:userId', generatorValidate(userSchema.deleteUser), userControllers.remove);

routes.patch('/:userId', generatorValidate(userSchema.updatedUser), userControllers.update);

routes.post('/:userId/avatar', generatorValidate(userSchema.loadAvatar), userControllers.loadAvatar);

routes.patch('/:userId/password', generatorValidate(userSchema.updatedPass), userControllers.updatePass);

export default routes;
