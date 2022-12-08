import CryptoJS from 'crypto-js';

import type { RequestHandler } from 'express';

import config from '../../config';
import repository from '../../db/index';

type BodyType = {
  oldPassword: string;
  newPassword: string;
  repeatNewPassword: string;
};

type ParamsType = Record<string, never>;

type QueryType = Record<string, never>;

type ResponseType = {
  message: string;
  enteredData?: BodyType;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const updateUserPass: HandlerType = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const hashOldPassword = CryptoJS.SHA512(oldPassword + config.hash.salt).toString();

    if (hashOldPassword !== req.user.password) {
      return res.status(403).json({
        message: 'the entered passwords invalid ',
        enteredData: req.body,
      });
    }

    const user = await repository.userRepository.findOne({ where: { id: req.user.id } });
    const hashNewPassword = CryptoJS.SHA512(newPassword + config.hash.salt).toString();

    user.password = hashNewPassword;

    await repository.userRepository.save(user);

    res.status(200).json({ message: 'new password succesfully updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'try the request later' });
  }
};

export default updateUserPass;
