import express from 'express';
import cors from 'cors';

import ErrorHandler from './middlewares/errorHandler';
import routes from './routes/index';
import config from './config';
import './types/express/index';

const app = express();

app.use(cors({
  origin: config.urls.clientApp,
}));

app.use(express.json());

app.use('/api', routes);
app.use(ErrorHandler);

export default app;
