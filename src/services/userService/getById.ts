import db from '../../db';
import { Exception } from '../../services';
import { errorTypes } from '../../utils';

const getCurrent = async (userId: number) => {
  const user = await db.user.findOne({ where: { userId } });
  if (!user) {
    throw Exception.createError(errorTypes.NOT_FOUND_USER_NOT_FOUND);
  }
  return user;
};

export default getCurrent;
