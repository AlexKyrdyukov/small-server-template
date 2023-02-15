import db from '../../db';
import { cartProductsService, cartService } from '../../services';

const decrease = async (cartId: number, bookId: number) => {
  const cart = await cartService.getAll(cartId);
  const index = cart.selectedProducts.findIndex((item) => +item.bookId === +bookId);

  if (index === -1) {
    return {
      bookId,
      countBook: 0,
    };
  }

  const product = cart.selectedProducts[index];

  if (product.countBook <= 1) {
    cart.selectedProducts.slice(index, index + 1);
    await cartService.update(cart);
    await db.cartProducts.remove(product);
    return {
      bookId,
      countBook: 0,
    };
  }

  product.countBook -= 1;
  await cartProductsService.updated(product);
  await cartService.update(cart);

  return {
    bookId: cart.selectedProducts[index].bookId,
    countBook: cart.selectedProducts[index].countBook,
  };
};

export default decrease;
