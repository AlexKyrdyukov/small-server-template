import db, { UsersEntity } from '../../db';
import cartService from '../cartService';
import hashPassword from './hashPassword';

const create = async (params: Partial<UsersEntity>) => {
  let user: Partial<UsersEntity> = new UsersEntity();
  Object.entries(params).forEach(([key, value]) => {
    if (key === 'password') {
      // eslint-disable-next-line no-param-reassign
      value = hashPassword(value as string);
    }
    // user[key] = value; // can it be done in this way
    user = {
      ...user,
      [key]: value,
    };
  });
  const savedUser = await db.user.save(user);
  delete savedUser.password;
  await cartService.create(savedUser);
  return savedUser;
};

export default create;
