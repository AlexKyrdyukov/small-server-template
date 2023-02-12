import express from 'express';

import authMidlleware from '../middlewares/auth';
import { commentControllers } from '../controllers';

const routes = express.Router();

routes.use(authMidlleware);

routes.post('/:userId', commentControllers.createComment);

export default routes;
