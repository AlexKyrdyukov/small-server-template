import * as typeorm from 'typeorm';

import { GenresEntity } from '../../db';

import { fileHelpers } from '../../utils';

enum CoverENUM {
  HARD = 'Hardcover',
  SOFT = 'Paperback',
}

@typeorm.Entity()
class Book {
  @typeorm.PrimaryGeneratedColumn()
  bookId: number;

  @typeorm.CreateDateColumn({ select: false })
  createdDate: Date;

  @typeorm.UpdateDateColumn({ select: false })
  updatedDate: Date;

  @typeorm.DeleteDateColumn({ select: false })
  deletedDate: Date;

  @typeorm.VirtualColumn({ hstoreType: 'string', query: (alias) => `${alias}.price`, transformer: { to(value) { return +value; }, from(value) { return value > 100 ? (value / 100).toFixed(2) : value.toString(); } } })
  priceString: string;

  @typeorm.Column({ unique: false, nullable: false, type: 'varchar' })
  name: string;

  @typeorm.Column({ unique: false, nullable: false, type: 'varchar' })
  author: string;

  @typeorm.Column({ unique: false, nullable: false, type: 'integer', select: false })
  price: number;

  @typeorm.Column({ unique: false, nullable: false, type: 'integer' })
  raiting: number;

  @typeorm.Column({ unique: false, nullable: false, type: 'boolean' })
  isInStock: boolean;

  @typeorm.Column({ unique: false, nullable: false, type: 'enum', enum: CoverENUM, default: [CoverENUM.HARD] })
  coverType: CoverENUM[];

  @typeorm.Column({ unique: false, nullable: false, type: 'boolean' })
  bestSeller: boolean;

  @typeorm.Column({ unique: false, nullable: true, type: 'boolean', default: false })
  new: boolean;

  @typeorm.Column({ unique: false, nullable: false, type: 'varchar' })
  description: string;

  @typeorm.Column({ unique: false, nullable: false, type: 'varchar' })
  image: string;

  @typeorm.Column({ unique: false, nullable: true, type: 'date', select: false })
  dateOfIssue: string;

  @typeorm.ManyToMany(() => GenresEntity, (genre) => genre.books)
  @typeorm.JoinTable()
  genres: GenresEntity[];

  @typeorm.AfterLoad()
  changeData() {
    this.image = fileHelpers.getUrl(this.image, 'bookCovers');
    this.new = fileHelpers.checkNew(this.dateOfIssue, this.createdDate);
  }
}

export default Book;
