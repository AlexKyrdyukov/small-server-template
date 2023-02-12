import db from '../../db';

const getAll = async (userId: string) => {
  const query = await db.cart
    .createQueryBuilder('cart')
    .leftJoinAndSelect('cart.selectedProducts', 'selectProduct')
    // .where('selectProduct.userId =:userId', { userId })
    .getMany();
  return query;
};

export default getAll;
