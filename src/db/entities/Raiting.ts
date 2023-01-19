import * as typeorm from 'typeorm';

import { BooksEntity } from '../../db';

@typeorm.Entity()
class Raiting {
  @typeorm.PrimaryGeneratedColumn()
  id: number;

  @typeorm.Column({ unique: false, nullable: false, type: 'integer' })
  userId: number;

  @typeorm.OneToMany(() => BooksEntity, (book) => book.bookId)
  bookId: number;
}

export default Raiting;
