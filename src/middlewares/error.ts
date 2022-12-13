/* eslint-disable no-console */
import type { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidationError } from 'yup';
import CustomError from '../exceptions/CustomError';

const ErrorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  if (err instanceof CustomError) {
    return res.status(err.status).json({
      message: err.message,
    });
  }
  if (err instanceof ValidationError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      err,
    });
  }
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: 'server error please request later',
  });
};

export default ErrorHandler;
