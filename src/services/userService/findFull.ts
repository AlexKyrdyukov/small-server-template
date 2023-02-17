import db from '../../db';
import { Exception } from '../../services';
import { errorTypes } from '../../utils';

const findFull = async (email: string) => {
  const query = await db.user
    .createQueryBuilder('user')
    .addSelect('user.password')
    .where('user.email = :email', { email })
    .getOne();
  if (!query) {
    throw Exception.createError(errorTypes.USER_NOT_FOUND);
  }
  return query;
};

export default findFull;
