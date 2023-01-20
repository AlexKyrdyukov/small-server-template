import * as typeorm from 'typeorm';

import { GenresEntity } from '../../db';

import { dbHelpers } from '../../utils';

enum CoverENUM {
  HARD = 'Hardcover',
  SOFT = 'Paperback',
}

@typeorm.Entity()
class Book {
  @typeorm.PrimaryGeneratedColumn()
  bookId: number;

  @typeorm.CreateDateColumn()
  createdDate: Date;

  @typeorm.UpdateDateColumn()
  updatedDate: Date;

  @typeorm.DeleteDateColumn()
  deletedDate: Date;

  @typeorm.VirtualColumn({ query: (book) => book })
  priceString: string;

  @typeorm.Column({ unique: false, nullable: false, type: 'varchar' })
  name: string;

  @typeorm.Column({ unique: false, nullable: false, type: 'varchar' })
  author: string;

  @typeorm.Column({ unique: false, nullable: false, type: 'integer' })
  price: number;

  @typeorm.Column({ unique: false, nullable: false, type: 'integer' })
  raiting: number;

  @typeorm.Column({ unique: false, nullable: false, type: 'boolean' })
  isAvailable: boolean;

  @typeorm.Column({ unique: false, nullable: false, type: 'enum', enum: CoverENUM, default: [CoverENUM.HARD] })
  coverType: CoverENUM[];

  @typeorm.Column({ unique: false, nullable: true, type: 'boolean' })
  bestSeller: boolean;

  @typeorm.Column({ unique: false, nullable: true, type: 'boolean' })
  new: boolean;

  @typeorm.Column({ unique: false, nullable: false, type: 'varchar' })
  description: string;

  @typeorm.Column({ unique: false, nullable: false, type: 'varchar' })
  image: string;

  @typeorm.Column({ unique: false, nullable: false, type: 'date' })
  dateOfIssue: string;

  @typeorm.ManyToMany(() => GenresEntity, (genre) => genre.books)
  @typeorm.JoinTable()
  genres: GenresEntity[];

  @typeorm.AfterLoad()
  changeData() {
    this.image = dbHelpers.getFileUrl(this.image, 'bookCovers');
  }
}

export default Book;
