import type { UsersEntity } from '../../db';
import db from '../../db';

const changeQuantity = async (bookId: string, quantity: number, user: UsersEntity) => {
  // eslint-disable-next-line no-console
  console.log('changeQuantity');
  const cartProducts = user.cartProducts;
  const index = cartProducts.findIndex((item) => item.bookId === Number(bookId));
  if (index === -1) {
    return;
  }
  const product = cartProducts[index];
  product.countBook = quantity;
  await db.cartProducts.save(product);
};

export default changeQuantity;
