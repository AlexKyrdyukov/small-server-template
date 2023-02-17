import * as typeorm from 'typeorm';

import { BooksEntity, UsersEntity } from '../../db';

@typeorm.Entity()
class CartProducts {
  @typeorm.PrimaryGeneratedColumn()
  cartProductId: number;

  @typeorm.CreateDateColumn()
  createdDate: Date;

  @typeorm.UpdateDateColumn()
  updatedDate: Date;

  @typeorm.DeleteDateColumn()
  deletedDate: Date;

  @typeorm.Column({ nullable: false, type: 'integer' })
  countBook: number;

  @typeorm.Column({ nullable: false, type: 'integer' })
  bookId: number;

  @typeorm.ManyToOne(() => UsersEntity, (user) => user.cartProducts)
  users: UsersEntity;

  @typeorm.ManyToOne(() => BooksEntity, (book) => book.productCart)
  book: BooksEntity;
}

export default CartProducts;
