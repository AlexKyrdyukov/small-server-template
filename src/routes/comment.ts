import express from 'express';

import { commentControllers } from '../controllers';
import authMidlleware from '../middlewares/auth';

const routes = express.Router();

routes.use(authMidlleware);

routes.post('/comment', commentControllers.createComment);

export default routes;
