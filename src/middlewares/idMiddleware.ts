import type { Request, Response, NextFunction } from 'express';

const idExam = async (req: Request, res: Response, next: NextFunction) => {
  try {
  // eslint-disable-next-line no-console
    console.log(req.url);
    next();
  } catch (error) {
    next(error);
  }
};

export default idExam;
