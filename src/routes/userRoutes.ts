import express from 'express';
import userController from '../controllers/userControllers';
import authMiddleWare from '../middlewares/authMiddleware';

const routes = express.Router();

routes.use(authMiddleWare);
routes.post('/', userController.createUser);
routes.get('/', userController.getUserData);
routes.patch('/:fullName', userController.updateUserData);
routes.delete('/:fullName', userController.deleteUser);

export default routes;
