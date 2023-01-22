import * as typeorm from 'typeorm';

import { BooksEntity } from '../../db';

@typeorm.Entity()
class Genres {
  @typeorm.PrimaryGeneratedColumn()
  genreId: number;

  @typeorm.CreateDateColumn({ select: false })
  createdDate: Date;

  @typeorm.UpdateDateColumn({ select: false })
  updatedDate: Date;

  @typeorm.DeleteDateColumn({ select: false })
  deletedDate: Date;

  @typeorm.Column({ unique: true, nullable: false, type: 'varchar' })
  name: string;

  @typeorm.ManyToMany(() => BooksEntity, (book) => book.genres)
  books: BooksEntity[];
}

export default Genres;
