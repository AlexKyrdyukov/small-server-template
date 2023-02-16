import db from '../../db';
import { Exception } from '../../services';
import { errorTypes } from '../../utils';

const findFull = async (email: string) => {
  const query = await db.user
    .createQueryBuilder('user')
    .addSelect('user.password')
    .where('user.email = :email', { email })
    .leftJoinAndSelect('user.likeBooks', 'bookIds')
    .leftJoinAndSelect('user.cart', 'cart')
    .leftJoinAndSelect('cart.selectedProducts', 'products')
    .leftJoinAndSelect('products.book', 'book')
    .orderBy('products.createdDate', 'ASC')
    .getOne();
  if (!query) {
    throw Exception.createError(errorTypes.USER_NOT_FOUND);
  }
  return query;
};

export default findFull;
