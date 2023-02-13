import type { UsersEntity } from '../../db';
import db, { CartProductsEntity } from '../../db';
import { cartService, bookService } from '../../services';

const create = async (bookId: number, user: UsersEntity) => {
  const cart = await cartService.getAll(user.cart.cartId);
  const index = cart.selectedProducts.findIndex((item) => item.bookId === bookId);
  if (index !== -1) {
    return cart.selectedProducts;
  }
  const cartProduct = new CartProductsEntity();
  const book = await bookService.getById(bookId);
  cartProduct.countBook = 1;
  cartProduct.bookId = book.bookId;
  cartProduct.book = book;
  cartProduct.userCart = user.cart;
  await db.cartProducts.save(cartProduct);
  cart.selectedProducts = [...cart.selectedProducts, cartProduct];
  await db.cart.save(cart);
  return cart.selectedProducts;
};

export default create;
