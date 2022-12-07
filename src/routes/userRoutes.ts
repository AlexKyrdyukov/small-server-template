import express from 'express';
import userController from '../controllers/userControllers';
import authMiddleWare from '../middlewares/authMiddleware';
import userSchemas from '../validationSchemas/userSchemas';
import validate from '../middlewares/validationMiddleware';

const routes = express.Router();

routes.use(authMiddleWare);

routes.get('/getuser', userController.getUserData);

routes.patch('/updateuser', validate(userSchemas.updatedUserSchema), userController.updateUser);

routes.patch('/updatepass', validate(userSchemas.updatedPassSchema), userController.updateUserPass);

routes.delete('/deleteuser', userController.deleteUser);

export default routes;
