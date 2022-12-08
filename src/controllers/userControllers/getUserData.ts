import type { RequestHandler } from 'express';

import type UserType from '../../db/entities/User';

import repository from '../../db/index';

type BodyType = Record<string, never>;

type ParamsType = Record<string, never>;

type QueryType = Record<string, never>;

type ResponseType = {
  message?: string;
  user?: UserType;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const getUserData: HandlerType = async (req, res) => {
  try {
    const user = await repository.userRepository.findOne({ where: { id: req.user.id } });

    if (!user) {
      return res.status(400).json({ message: 'user not found' });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'try the request later' });
  }
};

export default getUserData;
