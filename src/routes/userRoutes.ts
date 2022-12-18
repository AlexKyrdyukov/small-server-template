import express from 'express';

import userController from '../controllers/userControllers';
import authMiddleware from '../middlewares/auth';
import version from '../validationSchemas/userSchemas';
import createValidationMiddleware from '../middlewares/createValidation';

const routes = express.Router();

routes.use(authMiddleware);

routes.delete('/:userId', createValidationMiddleware(version.deleteUser), userController.deleteUser);

routes.patch('/:userId', createValidationMiddleware(version.updatedUser), userController.updateUser);

routes.patch('/:userId/password', createValidationMiddleware(version.updatedPass), userController.updateUserPass);

export default routes;
