import db from '../../db';
import type { CartsEntity } from '../../db';

const saveCreated = async (cart: CartsEntity) => {
  await db.cart.save(cart);
};

export default saveCreated;
