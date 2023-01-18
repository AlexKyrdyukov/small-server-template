import * as typeorm from 'typeorm';

import Book from './Book';

@typeorm.Entity()
class Genres {
  @typeorm.PrimaryGeneratedColumn()
  genreId: number;

  @typeorm.Column({ unique: true, nullable: false, type: 'varchar' })
  name: string;

  @typeorm.ManyToMany(() => Book, (book) => book.genres)
  books: Book[];
}

export default Genres;
