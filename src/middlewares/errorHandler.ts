/* eslint-disable no-console */
import { StatusCodes } from 'http-status-codes';

import type { ErrorRequestHandler } from 'express';
import config from '../config';
import CustomError from '../exceptions/CustomError';

const ErrorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  if (err instanceof CustomError) {
    return res.status(err.status).json({
      message: err.message,
      error: err.payload,
    });
  }

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: config.server.internalErrorMessage,
  });
};

export default ErrorHandler;
