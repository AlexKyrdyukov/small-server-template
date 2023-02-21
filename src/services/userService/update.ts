import db from '../../db';
import type { UsersEntity } from '../../db';
import hashPassword from './hashPassword';

const update = async (params: Partial<UsersEntity>, user: Partial<UsersEntity>) => {
  let updateUser = user;

  Object.entries(params).forEach(([key, value]) => {
    let newValue = value;
    if (key === 'password') {
      newValue = hashPassword(value as string);
    }
    updateUser = {
      ...updateUser,
      [key]: newValue,
    };
  });

  const savedUser = await db.user.save(updateUser);
  delete savedUser.password;
  return savedUser;
};

export default update;
