import db from '../../db';
import type { UsersEntity } from '../../db';
import hashPassword from './hashPassword';

const update = async (params: Partial<UsersEntity>, user?: Partial<UsersEntity>) => {
  let updateUser = user;
  Object.entries(params).forEach(([key, value]) => {
    if (key === 'password') {
      // eslint-disable-next-line no-param-reassign
      value = hashPassword(value as string);
    }
    updateUser = {
      ...updateUser,
      [key]: value,
    };
  });
  const savedUser = await db.user.save(updateUser);
  delete savedUser?.password;
  return savedUser;
};

export default update;
