import * as typeorm from 'typeorm';

import { BooksEntity } from '../../db';

@typeorm.Entity()
class Cart {
  @typeorm.PrimaryGeneratedColumn()
  cartId: number;

  @typeorm.Column({ unique: false, nullable: false, type: 'integer' })
  userId: number;

  @typeorm.OneToMany(() => BooksEntity, (book) => book.bookId)
  books: BooksEntity[];
}

export default Cart;
