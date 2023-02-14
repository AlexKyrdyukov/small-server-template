import { cartProductsService, cartService } from '../../services';

const addingCount = async (cartid: number, bookId: number) => {
  const cart = await cartService.getAll(cartid);
  const index = cart.selectedProducts.findIndex((item) => item.bookId === bookId);
  if (index === -1) {
    return {
      bookId: cart.selectedProducts[index].bookId,
      countBook: cart.selectedProducts[index].countBook,
    };
  }
  const product = cart.selectedProducts[index];
  product.countBook += 1;
  await cartProductsService.updated(product);
  await cartService.update(cart);
  return {
    bookId: cart.selectedProducts[index].bookId,
    countBook: cart.selectedProducts[index].countBook,
  };
};

export default addingCount;
