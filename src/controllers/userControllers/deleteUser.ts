import type { Request, Response } from 'express';
import repositorys from '../../db/index';

const deleteUser = async (req: Request, res: Response) => {
  try {
  // eslint-disable-next-line no-console
    console.log(req, res, repositorys.userRepository);
  } catch (error) {
    console.error(error);
  }
};

export default deleteUser;
