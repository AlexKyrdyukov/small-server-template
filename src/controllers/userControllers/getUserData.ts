import type { Request, Response } from 'express';
import userRepository from '../../db/index';

const getUserData = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line no-console
    console.log(userRepository.userRepository, req, res);
  } catch (error) {
    console.error(error);
  }
};

export default getUserData;
