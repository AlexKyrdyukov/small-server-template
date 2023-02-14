import db from '../../db';
import cartService from '../cartService';

const deleteById = async (bookId: number, cartId: number) => {
  const cart = await cartService.getAll(cartId);

  const index = cart.selectedProducts.findIndex((item) => +item.bookId === +bookId);
  if (index === -1) {
    return {
      bookId,
      countBook: 0,
    };
  }

  const product = cart.selectedProducts[index];
  db.cartProducts.remove(product);
  cart.selectedProducts.splice(index, 1);
  await cartService.update(cart);
  return {
    bookId,
    countBook: 0,
  };
};

export default deleteById;
