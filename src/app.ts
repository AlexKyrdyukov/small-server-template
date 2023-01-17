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

app.use(express.json({
  limit: '50mb',
}));

app.use('/api', routes);
app.use('/api/public/static', express.static('public/static'));
app.use(errorHandler);

export default app;
