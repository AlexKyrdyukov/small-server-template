import express from 'express';
import userController from '../controllers/userControllers';
import authMiddleware from '../middlewares/auth';
import userSchema from '../validationSchemas/userSchema';
import generatorValidate from '../middlewares/generatorSchemas';

const routes = express.Router();

routes.use(authMiddleware);

routes.delete('/:userId', generatorValidate(userSchema), userController.deleteUser);

routes.patch('/:userId', generatorValidate(userSchema), userController.updateUser);

routes.patch('/:userId/password', generatorValidate(userSchema), userController.updateUserPass);

export default routes;
