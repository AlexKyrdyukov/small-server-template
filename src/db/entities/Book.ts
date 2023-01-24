import * as typeorm from 'typeorm';

import { GenresEntity } from '../../db';

import { fileHelpers, dataHelper } from '../../utils';

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

  @typeorm.UpdateDateColumn({ select: false })
  updatedDate: Date;

  @typeorm.DeleteDateColumn({ select: false })
  deletedDate: Date;

  // @typeorm.VirtualColumn({ hstoreType: 'string', query: (alias) => `${alias}."priceInCent"`, transformer: { to(value) { return +value; }, from(value) { return value > 100 ? (value / 100).toFixed(2) : value.toString(); } } })
  // priceInDollar: string;

  // @typeorm.VirtualColumn({ hstoreType: 'string', query: (alias) => `${alias}.priceInCent` })
  // priceInDollar: string;

  @typeorm.Column({ unique: false, nullable: false, type: 'varchar' })
  name: string;

  @typeorm.Column({ unique: false, nullable: false, type: 'varchar' })
  author: string;

  @typeorm.Column({ unique: false, nullable: true, type: 'integer', select: false })
  priceInCent: number;

  @typeorm.Column({ unique: false, nullable: false, type: 'integer' })
  raiting: number;

  @typeorm.Column({ unique: false, nullable: false, type: 'boolean' })
  isInStock: boolean;

  @typeorm.Column({ unique: false, nullable: false, type: 'enum', enum: CoverENUM })
  coverType: CoverENUM;

  @typeorm.Column({ unique: false, nullable: false, type: 'boolean' })
  bestSeller: boolean;

  @typeorm.Column({ unique: false, nullable: true, type: 'boolean', default: false })
  new: boolean;

  @typeorm.Column({ unique: false, nullable: false, type: 'varchar' })
  description: string;

  @typeorm.Column({ unique: false, nullable: false, type: 'varchar' })
  image: string;

  @typeorm.Column({ unique: false, nullable: true, type: 'date' })
  dateOfIssue: string;

  @typeorm.ManyToMany(() => GenresEntity, (genre) => genre.books)
  @typeorm.JoinTable()
  genres: GenresEntity[];

  priceInDollar: string;

  @typeorm.AfterLoad()
  changeLoadData() {
    this.image = fileHelpers.getUrlImage(this.image, 'bookCovers');
    this.new = dataHelper.checkIsNew(this.dateOfIssue, this.createdDate);
    this.priceInDollar = dataHelper.convertInString(+this.priceInCent);
    // this.priceString = fileHelpers.convertInString(+this.priceString);
  }

  @typeorm.AfterInsert()
  c() {
    this.priceInCent = dataHelper.convertInNumber(this.priceInDollar);
  }
}

export default Book;
