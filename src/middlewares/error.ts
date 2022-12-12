import { StatusCodes } from 'http-status-codes';
import { ValidationError } from 'yup';
import type { ErrorRequestHandler } from 'express';
import CustomError from '../exceptions/CustomError';

import config from '../config';

const ErrorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  // // eslint-disable-next-line no-console
  // console.log(err);
  if (err instanceof CustomError) {
    return res.status(err.status).json({ message: err.message });
  }
  if (err instanceof ValidationError) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: 'server error please request later',
    stack: config.nodeEnv ? err.stack : {},
  });
};

export default ErrorHandler;
