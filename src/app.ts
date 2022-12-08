import express from 'express';
import cors from 'cors';

import routes from './routes/index';
import config from './config';
import ErrorHandler from './middlewares/errorMiddleWare';
import './types/express/index';

const app = express();

app.use(cors({
  origin: config.urls.client,
}));
app.use(express.json());

app.use('/api', routes);
app.use(ErrorHandler);

export default app;
