import * as typeorm from 'typeorm';

import { BooksEntity, UsersEntity } from '../../db';

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

  @typeorm.OneToMany(() => BooksEntity, (book) => book.bookInCart)
  @typeorm.JoinColumn()
  books: BooksEntity[];
}

export default Cart;
