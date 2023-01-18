import * as typeorm from 'typeorm';

import Book from './Book';

@typeorm.Entity()
class Raiting {
  @typeorm.PrimaryGeneratedColumn()
  id: number;

  @typeorm.Column({ unique: false, nullable: false, type: 'integer' })
  userId: number;

  @typeorm.OneToMany(() => Book, (book) => book.bookId)
  bookId: number;
}

export default Raiting;
