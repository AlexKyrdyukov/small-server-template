import type { Request, Response, NextFunction } from 'express';

import config from '../config';

type ErrorType = {
  status: number;
  message: string;
  stack: string;
};

const ErrorHandler = (err: ErrorType, req: Request, res: Response, next: NextFunction) => {
  // eslint-disable-next-line no-console
  console.log('Middleware Error Hadnling', next);
  const errStatus = err.status || 500;
  const errMsg = err.message || 'Something went wrong';
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: config.nodeEnv === 'development' ? err.stack : {},
  });
};

export default ErrorHandler;
