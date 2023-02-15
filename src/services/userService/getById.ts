import db from '../../db';
import { Exception } from '../../services';
import { errorTypes } from '../../utils';

const getCurrent = async (userId: number) => {
  const query = await db.user
    .createQueryBuilder('user')
    .where('user.userId = :userId', { userId })
    .leftJoinAndSelect('user.likeBooks', 'likes')
    .leftJoinAndSelect('user.cart', 'cart')
    .leftJoinAndSelect('cart.selectedProducts', 'products')
    .leftJoinAndSelect('products.book', 'book')
    .orderBy('products.createdDate', 'ASC')
    .getOne();
  if (!query) {
    throw Exception.createError(errorTypes.NOT_FOUND_USER_NOT_FOUND);
  }
  return query;
};

export default getCurrent;
