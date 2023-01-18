import * as typeorm from 'typeorm';
import Book from './Book';

@typeorm.Entity()
class Cart {
  @typeorm.PrimaryGeneratedColumn()
  cartId: number;

  @typeorm.Column({ unique: false, nullable: false, type: 'integer' })
  userId: number;

  @typeorm.OneToMany(() => Book, (book) => book.bookId)
  books: Book[];
}

export default Cart;
