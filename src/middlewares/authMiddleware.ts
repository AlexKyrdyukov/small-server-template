import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import repository from '../db/index';

const authVerification = async (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    next();
  }
  try {
    let decodedToken;
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(403).json({ message: 'User is not authorized' });
    }

    try {
      decodedToken = jwt.verify(
        token, config.tokenProperty.tokenSecret,
      ) as {id: number};
    } catch (error) {
      return res.status(401).json({ message: 'user unauthorized' });
    }

    const userDb = await repository.userRepository.findOne({ where: { id: decodedToken.id } });

    req.user = userDb;

    next();
  } catch (error) {
    console.error(error);
    return res.status(403).json({ message: 'User is not authorized' });
  }
};

export default authVerification;
