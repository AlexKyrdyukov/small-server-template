import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { userService } from '../../services';

type BodyType = {
  password: string;
  newPassword: string;
};

type ParamsType = Record<string, never>;

type QueryType = Record<string, never>;

type ResponseType = {
  message: string;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const updateUserPass: HandlerType = async (req, res, next) => {
  try {
    userService.checkById(req.user, req.params.userId);

    const { password, newPassword } = req.body;

    const user = await userService.findFullUser(req.user.email);
    userService.checkPassword(password, user.password);

    userService.saveUser({ password: newPassword }, user);
    res.status(StatusCodes.OK).json({ message: 'new password succesfully updated' });
  } catch (error) {
    next(error);
  }
};

export default updateUserPass;
