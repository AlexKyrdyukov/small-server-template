import db from '../../db';

const getById = async (cartId: number) => {
  console.log('4userId', cartId);
  const cart = await db.cart
    .createQueryBuilder('cart')
    .where('cart.cartId = :cartId', { cartId })
    .leftJoinAndSelect('cart.user', 'user')
    .leftJoinAndSelect('cart.selectedProducts', 'selectedProducts')
    .getOne();
  return cart;
};

export default getById;
