import type { Handler } from 'express';
import repository from '../../db/index';

const loginUser: Handler = async (req, res) => {
  try {
    const { email } = req.body;
    const userArray = await repository.userRepository.find({ select: {
      email,
    } });
    if (!userArray.length) {
      return res.status(400).json({ message: 'user with this name not found' });
    }
    // eslint-disable-next-line no-console
    console.log(userArray);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
  }
};

export default loginUser;
