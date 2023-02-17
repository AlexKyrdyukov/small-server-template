import db, { UsersEntity } from '../../db';
import { userService } from '../../services';

const create = async (params: Partial<UsersEntity>) => {
  let user: Partial<UsersEntity> = new UsersEntity();

  Object.entries(params).forEach(([key, value]) => {
    let currentValue = value;

    if (key === 'password') {
      currentValue = userService.hashPassword(value as string);
    }
    user = {
      ...user,
      [key]: currentValue,
    };
  });

  const savedUser = await db.user.save(user);
  delete savedUser.password;

  // const createdUser = await userService.getById(user.userId);
  return user;
};

export default create;
