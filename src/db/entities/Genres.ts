import * as typeorm from 'typeorm';

import { BooksEntity } from '../../db';

@typeorm.Entity()
class Genres {
  @typeorm.PrimaryGeneratedColumn()
  genreId: number;

  @typeorm.CreateDateColumn()
  createdDate: Date;

  @typeorm.UpdateDateColumn()
  updatedDate: Date;

  @typeorm.DeleteDateColumn()
  deletedDate: Date;

  @typeorm.Column({ unique: true, nullable: false, type: 'varchar' })
  name: string;

  @typeorm.ManyToMany(() => BooksEntity, (book) => book.genres)
  books: BooksEntity[];
}

export default Genres;
