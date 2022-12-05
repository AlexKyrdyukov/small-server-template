import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';
import config from '../config';

const authVerification = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(403).json({ message: 'User is not authorized' });
    }
    const decodedToken = jwt.verify(token, config.tokenProperty.tokenSecret);
    req.body.user = decodedToken;
  } catch (error) {
    console.error(error);
    return res.status(403).json({ message: 'User is not authorized' });
  }
};

export default authVerification;
