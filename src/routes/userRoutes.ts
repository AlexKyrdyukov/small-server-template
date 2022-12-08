import express from 'express';
import userController from '../controllers/userControllers';
import authMiddleWare from '../middlewares/authMiddleware';
import userSchema from '../validationSchemas/userSchema';
import generatorValidate from '../middlewares/validationMiddleware';

const routes = express.Router();

routes.use(authMiddleWare);

// routes.get('/:userId', userController.getUserData);

routes.patch('/:userId', generatorValidate(userSchema.updatedUser), userController.updateUser);

routes.patch('/:userId/password', generatorValidate(userSchema.updatedPass), userController.updateUserPass);

routes.delete('/:userId', userController.deleteUser);

export default routes;
