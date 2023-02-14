import type { CartProductsEntity } from '../../db';
import db from '../../db';

const save = async (cartProduct: CartProductsEntity) => {
  await db.cartProducts.save(cartProduct);
};

export default save;
