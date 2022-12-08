import type { ErrorRequestHandler } from 'express';

import config from '../config';

const ErrorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  const errStatus = err.status || 500;
  const errMsg = err.message || 'Something went wrong';
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: config.nodeEnv ? err.stack : {},
  });
};

export default ErrorHandler;
