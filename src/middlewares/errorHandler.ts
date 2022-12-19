import { StatusCodes } from 'http-status-codes';

import type { ErrorRequestHandler } from 'express';

import CustomError from '../exceptions/CustomError';
import config from '../config';

const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  if (err instanceof CustomError) {
    return res.status(err.status).json({
      message: err.message,
      errors: err.payload,
    });
  }

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: config.server.internalErrorMessage,
  });
};

export default errorHandler;
