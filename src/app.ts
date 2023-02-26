import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import errorHandler from './middlewares/errorHandler';
import routes from './routes';
import config from './config';

import './types';
import { logger } from './utils';

const app = express();
const httpServer = createServer(app);

app.use(cors({ origin: config.urls.clientApp }));

app.use(express.json({ limit: config.server.jsonLimit }));

app.use(express.static(config.server.publicFolderName));

export const io = new Server(httpServer, { cors: { origin: 'http://localhost:3000' } });
io.on('connection', (socket) => {
  logger.log(`⚡: ${socket.id} user just connected`);
  socket.on('disconnect', () => {
    logger.log('🔥: A user disconnected');
  });
});
httpServer.listen(3001);

app.use(config.server.endointsPrefix, routes);

app.use(errorHandler);

export default app;
