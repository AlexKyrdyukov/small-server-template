import { StatusCodes } from 'http-status-codes';

import type { RequestHandler } from 'express';

import { userService } from '../../services';
import { fileHelpers } from '../../utils';

type BodyType = Record<string, string>;
type ParamsType = Record<string, never>;
type QueryType = Record<string, never>;

type ResponseType = {
  message: string;
  avatar: string;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const loadAvatar: HandlerType = async (req, res, next) => {
  try {
    userService.checkById(req.user, req.params.userId);
    if (req.user.avatar) {
      await fileHelpers.removeImage(req.user.avatar, 'avatars');
    }
    const [meta, image] = req.body.file.split(',');
    const file = fileHelpers.convertBase64ToBuffer(image);
    const fileName = fileHelpers.createFileName(meta);
    await fileHelpers.writeImage(file, 'avatars', fileName);
    const user = await userService.update({ avatar: fileName }, req.user);

    res.status(StatusCodes.OK).json({ message: 'avatar succesfully updated', avatar: fileHelpers.getUrlImage(user.avatar, 'userAvatars') });
  } catch (error) {
    next(error);
  }
};

export default loadAvatar;
