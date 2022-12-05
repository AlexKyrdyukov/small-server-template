import type { Request, Response } from 'express';
import repositorys from '../../db/index';

const updateUserData = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line no-console
    console.log(repositorys.userRepository, req, res);
  } catch (error) {
    console.error(error);
  }
};

export default updateUserData;
