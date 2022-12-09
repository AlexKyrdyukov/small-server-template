import CryptoJS from 'crypto-js';

import type { RequestHandler } from 'express';

import config from '../../config';
import dB from '../../db';

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

const updateUserPass: HandlerType = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const hashOldPassword = CryptoJS.SHA512(oldPassword + config.hash.salt).toString();

    if (hashOldPassword !== req.user.password) {
      return res.status(403).json({
        message: 'the entered passwords invalid ',
        enteredData: req.body,
      });
    }

    const user = await dB.user.findOne({ where: { id: req.user.id } });
    const hashNewPassword = CryptoJS.SHA512(newPassword + config.hash.salt).toString();

    user.password = hashNewPassword;

    await dB.user.save(user);

    res.status(200).json({ message: 'new password succesfully updated' });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export default updateUserPass;
