import type { UsersEntity } from '../../db';
import db, { CartProductsEntity } from '../../db';
import bookService from '../bookService';

const addById = async (bookId: number, user: UsersEntity) => {
  const book = await bookService.getById(bookId);
  const cartProduct = new CartProductsEntity();
  const index = user.cartProducts.findIndex((item) => item.bookId === bookId);

  if (index !== -1) {
    return;
  }
  cartProduct.users = user;
  cartProduct.book = book;
  cartProduct.countBook = 1;
  cartProduct.bookId = book.bookId;

  const savedProduct = await db.cartProducts.save(cartProduct);
  delete savedProduct.users;

  return savedProduct;
};

export default addById;
