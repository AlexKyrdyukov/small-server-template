import express from 'express';
import cors from 'cors';

import errorHandler from './middlewares/errorHandler';
import { routes } from './routes';
import config from './config';

import './types/express';

const app = express();

app.use(cors({ origin: config.urls.clientApp }));

app.use(express.json({ limit: config.server.jsonLimit }));

app.use(express.static(config.server.publicFolderName));

app.use(config.server.endointsPrefix, routes);

app.use(errorHandler);

export default app;
