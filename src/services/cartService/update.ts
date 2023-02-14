import type { CartsEntity } from '../../db';
import db from '../../db';

const saveCreated = async (cart: CartsEntity) => {
  await db.cart.save(cart);
};

export default saveCreated;
