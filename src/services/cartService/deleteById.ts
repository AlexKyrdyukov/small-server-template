import type { UsersEntity } from '../../db';
import db from '../../db';

const deleteById = async (bookId: string, user: UsersEntity) => {
  const cartProducts = user.cartProducts;
  const index = cartProducts.findIndex((item) => item.bookId === Number(bookId));
  const product = cartProducts[index];

  await db.cartProducts.remove(product);
  await db.user.save(user);
};

export default deleteById;
