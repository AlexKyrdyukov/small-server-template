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

const checkById = (user: UsersEntity, idFromFront: number) => {
  if (user.userId !== +idFromFront) {
    throw Exception.createError(errorTypes.FORBIDDEN_UNKNOWN_AUTHORIZATION_TYPE);
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

const saveUser = async (params: Partial<UsersEntity>, user?: UsersEntity) => {
  let newUser: Partial<UsersEntity> = new UsersEntity();
  Object.entries(params).forEach(([key, value]) => {
    if (key === 'password') {
      // eslint-disable-next-line no-param-reassign
      value = hashHelpers.hashPassword(value as string);
    }
    // eslint-disable-next-line no-unused-expressions
    user ? newUser = {
      ...user,
      [key]: value,
    } : newUser = {
      ...newUser,
      [key]: value,
    };

  });
  const savedUser = await db.user.save(newUser);
  delete savedUser?.password;
  return savedUser;
};

const checkPassword = (newPassword: string, oldPassword: string) => {
  const verification = hashHelpers.checkPassword(newPassword, oldPassword);
  if (!verification) {
    throw Exception.createError(errorTypes.BAD_REQUEST_INVALID_PASSWORD);
  }
};

export default {
  checkById,
  getUser,
  findFullUser,
  deleteUser,
  existenceCheck,
  saveUser,
  checkPassword,
};
