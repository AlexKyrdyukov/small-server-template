import { StatusCodes } from 'http-status-codes';

import type { RequestHandler } from 'express';

import { userService } from '../../services';

type BodyType = Record<string, never>;
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

    const user = await userService.findFull(req.user.email);
    userService.checkPassword(password, user.password);

    await userService.update({ password: newPassword }, user);
    res.status(StatusCodes.OK).json({ message: 'new password succesfully updated' });
  } catch (error) {
    next(error);
  }
};

export default updateUserPass;
