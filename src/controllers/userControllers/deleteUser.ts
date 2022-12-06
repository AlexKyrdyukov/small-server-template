import type { Request, Response } from 'express';
import repository from '../../db/index';

const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await repository.userRepository.findOne({ where: { id: req.user.id } });
    if (!user) {
      return res.status(400).json({ message: 'user not found' });
    }
    repository.userRepository.remove(user);
    res.status(200).json({ message: 'user be removed' });
  } catch (error) {
    console.error(error);
  }
};

export default deleteUser;
