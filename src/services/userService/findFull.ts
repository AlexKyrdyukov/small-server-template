import db from '../../db';
import { Exception } from '../../services';
import { errorTypes } from '../../utils';

const findFull = async (email: string) => {
  const user = await db.user
    .createQueryBuilder('user')
    .addSelect('user.password')
    .where('user.email = :email', { email })
    .leftJoinAndSelect('user.likeBooks', 'bookIds')
    .getOne();
  if (!user) {
    throw Exception.createError(errorTypes.NOT_FOUND_USER_NOT_FOUND);
  }
  return user;
};

export default findFull;
