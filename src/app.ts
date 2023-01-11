import express from 'express';
import cors from 'cors';

import errorHandler from './middlewares/errorHandler';
import routes from './routes';
import config from './config';
import './types/express';

const app = express();

app.use(cors({
  origin: config.urls.clientApp,
}));

app.use(express.json());
app.use('/api', routes);
app.use('/api', express.static('public/static'));
app.use(errorHandler);

export default app;
