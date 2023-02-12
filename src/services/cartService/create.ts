import type { UsersEntity } from '../../db';
import db, { CartsEntity } from '../../db';

const createuserCart = async (user: UsersEntity) => {
  const cart = new CartsEntity();
  cart.user = user;
  await db.cart.save(cart);
};

export default createuserCart;
