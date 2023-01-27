import { StatusCodes } from 'http-status-codes';

import type { ErrorRequestHandler } from 'express';

import { logger } from '../utils';
import { Exception } from '../services';
import config from '../config';

const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  if (err instanceof Exception) {
    return res.status(err.status).json({
      message: err.message,
      errors: err.payload,
    });
  }

  logger.error(err);

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: config.server.internalErrorMessage,
  });
};

export default errorHandler;
