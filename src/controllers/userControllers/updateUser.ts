import type { RequestHandler } from 'express';
import type UserType from '../../db/entities/User';
import repository from '../../db/index';

type BodyType = {
  newName: string;
  newDob: Date;
  newEmail: string;
};

type ParamsType = Record<string, never>;

type QueryType = Record<string, never>;

type ResponseType = {
  message: string;
  enteredData?: BodyType;
  userInfo?: UserType;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const updateUser: HandlerType = async (req, res) => {
  try {
    const { newName, newDob, newEmail } = req.body;

    const user = await repository.userRepository.findOne({ where: { id: req.user.id } });

    if (!user) {
      return res.status(400).json({
        message: 'user not found',
        enteredData: req.body,
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