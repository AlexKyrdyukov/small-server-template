import db from '../../db';

const getAll = async (userId: number) => {
  const query = await db.cart
    .createQueryBuilder('cart')
    .where('cart.cartId = :userId', { userId })
    .leftJoinAndSelect('cart.selectedProducts', 'products')
    .getOne();
  return query;
};

export default getAll;
