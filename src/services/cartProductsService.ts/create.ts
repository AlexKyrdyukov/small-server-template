import db, { CartProductsEntity } from '../../db';
import { cartService, bookService } from '../../services';

const create = async (bookId: number, userId: string) => {
  const book = await bookService.getById(bookId);
  const userCart = await cartService.getById(userId);
  console.log('userCart', userCart);
  const cartProduct = new CartProductsEntity();
  cartProduct.countBook = 1;
  cartProduct.bookId = book.bookId;
  cartProduct.book = book;
  cartProduct.userCart = userCart;
  await db.cartProducts.save(cartProduct);
  userCart.selectedProducts = [cartProduct];
  await db.cart.save(userCart);
};

export default create;
