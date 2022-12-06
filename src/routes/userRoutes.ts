import express from 'express';
import userController from '../controllers/userControllers';
import authMiddleWare from '../middlewares/authMiddleware';

const routes = express.Router();

routes.use(authMiddleWare);

routes.post('/createuser', userController.createUser);

routes.get('/getuser', userController.getUserData);

routes.patch('/updateuser', userController.updateUser);

routes.patch('/updatepass', userController.updateUserPass);

routes.delete('/deleteuser', userController.deleteUser);

export default routes;
