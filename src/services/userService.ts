import db, { UsersEntity } from '../db';
import { errorTypes, fileHelpers, hashHelpers } from '../utils';
import Exception from './Exception';

const getUser = async (userId: number) => {
  const user = await db.user.findOne({ where: { userId } });
  if (!user) {
    throw Exception.createError(errorTypes.NOT_FOUND_USER_NOT_FOUND);
  }
  return user;
};

const createUser = async (email: string, password: string) => {
  const existenUser = await existenceCheck(email);
  if (existenUser) {
    throw Exception.createError(errorTypes.BAD_REQUEST_USER_ALREADY_EXIST);
  }
  const newUser = new UsersEntity();
  newUser.email = email;
  newUser.password = hashHelpers.hashPassword(password);
  const user = await db.user.save(newUser);
  delete user.password;
  return user;
};

const checkById = (user: UsersEntity, frontUserId: number) => {
  if (user.userId !== +frontUserId) {
    throw Exception.createError(errorTypes.FORBIDDEN_INVALID_REQUEST);
  }
};

const deleteUser = async (user: UsersEntity) => {
  fileHelpers.removeImage(user.avatar, 'avatars');
  await db.user.remove(user);
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

const existenceCheck = async (email: string) => {
  const user = await db.user.findOne({
    where: {
      email,
    },
  });
  return user;
};

const updateUser = async (user: UsersEntity, email: string, fullName: string) => {
  // eslint-disable-next-line no-param-reassign
  user.email = email;
  // eslint-disable-next-line no-param-reassign
  user.fullName = fullName;
  const newUser = await db.user.save(user);
  return newUser;
};

export default {
  checkById,
  createUser,
  getUser,
  findFullUser,
  deleteUser,
  existenceCheck,
  updateUser,
};
