import type { UsersEntity } from '../../db';
import db from '../../db';

const changeQuantity = async (bookId: string, quantity: number, user: UsersEntity) => {
  const cartProducts = user.cartProducts;
  const index = cartProducts.findIndex((item) => item.bookId === Number(bookId));
  if (index === -1) {
    return;
  }
  const product = cartProducts[index];
  if (quantity <= 0) {
    db.cartProducts.remove(product);
    await db.user.save(user);
    return;
  }
  product.countBook = quantity;
  await db.cartProducts.save(product);
};

export default changeQuantity;
