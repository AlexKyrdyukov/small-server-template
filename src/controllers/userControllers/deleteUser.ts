import type { RequestHandler } from 'express';
import repository from '../../db/index';

type BodyType = Record<string, never>;

type ParamsType = Record<string, never>;

type QueryType = Record<string, never>;

type ResponseType = {
  message: string;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const deleteUser: HandlerType = async (req, res) => {
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
