import db, { UsersEntity } from '../db';
import { errorTypes, fileHelpers, hashHelpers } from '../utils';
import Exception from './Exception';

const getCurrent = async (userId: number) => {
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

const deleteCurrent = async (user: UsersEntity) => {
  fileHelpers.removeImage(user.avatar, 'avatars');
  await db.user.remove(user);
};

const findFull = async (email: string) => {
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

const existenceCheck = async (userProperty: string) => {
  const user = await db.user.findOne({
    where: {
      email: userProperty,
    },
  });
  if (user) {
    throw Exception.createError(errorTypes.BAD_REQUEST_USER_ALREADY_EXIST);
  }
};

const save = async (user: Partial<UsersEntity>) => {
  const savedUser = await db.user.save(user);
  return savedUser;
};

const create = async (params: Partial<UsersEntity>) => {
  let user: Partial<UsersEntity> = new UsersEntity();
  Object.entries(params).forEach(([key, value]) => {
    if (key === 'password') {
      // eslint-disable-next-line no-param-reassign
      value = hashHelpers.hashPassword(value as string);
    }
    // user[key] = value; // can it be done in this way
    user = {
      ...user,
      [key]: value,
    };
  });
  const savedUser = await save(user);
  delete savedUser.password;
  return savedUser;
};

const update = async (params: Partial<UsersEntity>, user?: Partial<UsersEntity>) => {
  let updateUser = user;
  Object.entries(params).forEach(([key, value]) => {
    if (key === 'password') {
      // eslint-disable-next-line no-param-reassign
      value = hashHelpers.hashPassword(value as string);
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

const checkPassword = (newPassword: string, oldPassword: string) => {
  const verification = hashHelpers.checkPassword(newPassword, oldPassword);
  if (!verification) {
    throw Exception.createError(errorTypes.BAD_REQUEST_INVALID_PASSWORD);
  }
};

export default {
  checkById,
  getCurrent,
  findFull,
  deleteCurrent,
  existenceCheck,
  save,
  checkPassword,
  update,
  create,
};
