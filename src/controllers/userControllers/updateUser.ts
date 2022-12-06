import type { Request, Response } from 'express';
import repository from '../../db/index';

const updateUser = async (req: Request, res: Response) => {
  try {
    const { newName, newDob, newEmail } = req.body;

    const user = await repository.userRepository.findOne({ where: { id: req.user.id } });

    if (!user) {
      return res.status(400).json({
        message: 'user not found',
        newName,
        newEmail,
        newDob,
      });
    }

    user.fullName = newName;
    user.dob = newDob;
    user.email = newEmail;

    await repository.userRepository.save(user);

    const userInfo = {
      fullName: newName,
      dob: newDob,
      email: newEmail,
    };

    res.status(200).json({ message: 'data succesfully updated', userInfo });
  } catch (error) {
    console.error(error);
    res.status(500);
  }
};

export default updateUser;
