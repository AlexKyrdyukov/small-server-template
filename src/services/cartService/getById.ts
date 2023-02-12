import db from '../../db';

const getUserCart = async (userId: string) => {
  const cart = await db.cart
    .createQueryBuilder('cart')
    .leftJoinAndSelect('cart.user', 'user')
    .where('cart.cartId = :userId', { userId: 3 })
    .getOne();
  return cart;
};

export default getUserCart;
