import db from '../../db';

const getById = async (cartId: number) => {
  const query = await db.cart
    .createQueryBuilder('cart')
    .where('cart.cartId = :cartId', { cartId })
    .leftJoinAndSelect('cart.user', 'user')
    .leftJoinAndSelect('cart.selectedProducts', 'selectedProducts')
    .getOne();
  return query;
};

export default getById;
