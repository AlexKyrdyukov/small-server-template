import db, { UsersEntity } from '../db';
import { errorTypes, hashHelpers } from '../utils';
import Exception from './Exception';

const existenceCheck = async (email: string) => {
  const user = await db.user.findOne({
    where: {
      email,
    },
  });
  return user;
};

const getUser = async (userId: number) => {
  const user = await db.user.findOne({ where: { userId } });
  if (!user) {
    throw Exception.createError(errorTypes.NOT_FOUND_USER_NOT_FOUND);
  }
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

const findFullUser = async (email: string) => {
  const user = await db.user
    .createQueryBuilder('user')
    .addSelect('user.password')
    .where('user.email = :email', { email })
    .getOne();
  if (!user) {
    throw Exception.createError(errorTypes.NOT_FOUND_USER_NOT_FOUND);
  }
  return user;
};

const checkPassword = () => {
  return 'dfdfdf';
};

export default {
  createUser,
  existenceCheck,
  checkPassword,
  findFullUser,
  getUser,
};
