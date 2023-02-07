import db from '../../db';
import { Exception } from '../../services';
import { errorTypes } from '../../utils';

const getCurrent = async (userId: number) => {
  const query = await db.user
    .createQueryBuilder('user')
    .where('user.userId = :userId', { userId })
    .leftJoinAndSelect('user.likeBooks', 'likeBooks')
    .getOne();
  console.log(query);
  return query;
  // const user = await db.user.findOne({ where: { userId } });
  // if (!user) {
  // throw Exception.createError(errorTypes.NOT_FOUND_USER_NOT_FOUND);
  // }
  // return user;
};

export default getCurrent;
