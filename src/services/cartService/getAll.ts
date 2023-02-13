import db from '../../db';

const getAll = async (cartId: number) => {
  const query = await db.cart
    .createQueryBuilder('cart')
    .where('cart.cartId = :cartId', { cartId })
    .leftJoinAndSelect('cart.selectedProducts', 'products')
    .leftJoinAndSelect('products.book', 'book')
    .getOne();
  return query;
};

export default getAll;
