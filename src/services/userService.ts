import db, { UsersEntity } from '../db';
import { hashHelpers } from '../utils';

const existenceCheck = async (email: string) => {
  const user = await db.user.findOne({
    where: {
      email,
    },
  });
  return user;
};

const createUser = async (email: string, password: string) => {
  const newUser = new UsersEntity();
  newUser.email = email;
  newUser.password = hashHelpers.hashPassword(password);
  const user = await db.user.save(newUser);
  delete user.password;
  return user;
};

const findUser = async (email: string) => {
  const user = await db.user
    .createQueryBuilder('user')
    .addSelect('user.password')
    .where('user.email = :email', { email })
    .getOne();
  return user;
};

const checkPassword = () => {
  return 'dfdfdf';
};

export default {
  createUser,
  existenceCheck,
  checkPassword,
  findUser,
};
