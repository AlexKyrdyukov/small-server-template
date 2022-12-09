import type { RequestHandler } from 'express';

import type UserType from '../../db/entities/User';
import dB from '../../db';

type BodyType = {
  fullName: string;
  dob: Date;
  email: string;
};

type ParamsType = Record<string, never>;

type QueryType = Record<string, never>;

type ResponseType = {
  message: string;
  enteredData?: BodyType;
  userInfo?: UserType;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const updateUser: HandlerType = async (req, res, next) => {
  try {
    const userDob = req.body.dob;
    const userEmail = req.body.email;
    const userFullName = req.body.fullName;
    const query = req.query;
    const params = req.params;
    // eslint-disable-next-line no-console
    console.log(query, params);

    const user = await dB.user.findOne({ where: { id: req.user.id } });

    user.fullName = userFullName;
    user.dob = userDob;
    user.email = userEmail;

    await dB.user.save(user);

    res.status(200).json({ message: 'data succesfully updated' });
  } catch (error) {
    next(error);
  }
};

export default updateUser;
