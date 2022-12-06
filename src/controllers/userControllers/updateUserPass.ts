import CryptoJS from 'crypto-js';

import type { Request, Response } from 'express';
import config from '../../config';
import repository from '../../db/index';

const updateUserPass = async (req: Request, res: Response) => {
  try {
    const { oldPassword, newPassword, repeatNewPassword } = req.body;

    const hashOldPassword = CryptoJS.SHA512(oldPassword + config.hashProperty.hashSalt).toString();

    if (hashOldPassword !== req.user.password) {
      return res.status(400).json({
        message: 'the entered passwords invalid ',
        oldPassword,
        newPassword,
        repeatNewPassword,
      });
    }

    if (newPassword !== repeatNewPassword) {
      return res.status(400).json({
        message: 'the entered new passwords must be the same',
        oldPassword,
        newPassword,
        repeatNewPassword,
      });
    }

    const user = await repository.userRepository.findOne({ where: { id: req.user.id } });
    const hashNewPassword = CryptoJS.SHA512(newPassword + config.hashProperty.hashSalt).toString();

    user.password = hashNewPassword;

    await repository.userRepository.save(user);

    res.status(200).json({ message: 'new password succesfully updated' });
  } catch (error) {
    console.error(error);
    res.status(500);
  }
};

export default updateUserPass;
