import db from '../../db';
import { Exception } from '../../services';
import { errorTypes } from '../../utils';

const getCurrent = async (userId: number) => {
  const user = await db.user.findOne({
    where: {
      userId,
    },
    relations: {
      favoriteBooks: true,
      cartProducts: {
        book: true,
      },
    },
    order: {
      cartProducts: {
        createdDate: 'ASC',
      },
    },
  });
  if (!user) {
    throw Exception.createError(errorTypes.USER_NOT_FOUND);
  }
  return user;
};

export default getCurrent;
