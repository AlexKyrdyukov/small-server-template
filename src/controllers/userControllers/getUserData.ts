import type { Request, Response } from 'express';
import repository from '../../db/index';

const getUserData = async (req: Request, res: Response) => {
  try {
    const user = await repository.userRepository.findOne({ where: { id: req.user.id } });
    // eslint-disable-next-line no-console
    if (!user) {
      return res.status(400).json({ message: 'user not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'server on chill' });
  }
};

export default getUserData;
