/* eslint-disable no-console */
import { StatusCodes } from 'http-status-codes';
import { ValidationError } from 'yup';
import type { ErrorRequestHandler } from 'express';
import CustomError from '../exceptions/CustomError';

const ErrorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  console.log(err instanceof CustomError);
  console.log(err instanceof ValidationError);
  if (err instanceof CustomError) {
    return res.status(err.status).json({ message: err.message });
  }
  if (err instanceof ValidationError) {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: err.errors, name: err.name });
  }

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: 'server error please request later',
  });
};

export default ErrorHandler;
