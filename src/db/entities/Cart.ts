import * as typeorm from 'typeorm';

import { CartProductsEntity, UsersEntity } from '../../db';

@typeorm.Entity()
class Cart {
  @typeorm.PrimaryGeneratedColumn()
  cartId: number;

  @typeorm.CreateDateColumn({ select: false })
  createdDate: Date;

  @typeorm.UpdateDateColumn({ select: false })
  updatedDate: Date;

  @typeorm.DeleteDateColumn({ select: false })
  deletedDate: Date;

  @typeorm.OneToOne(() => UsersEntity, (user) => user.cartId)
  userId: number;

  @typeorm.OneToMany(() => CartProductsEntity, (cartProduct) => cartProduct.userCart)
  selectedProducts: CartProductsEntity[];
}

export default Cart;
