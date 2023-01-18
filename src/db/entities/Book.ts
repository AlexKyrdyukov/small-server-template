import * as typeorm from 'typeorm';

import Genres from './Genres';

import dbHelper from '../../utils/dbHelper';

@typeorm.Entity()
class Book {
  @typeorm.PrimaryGeneratedColumn()
  bookId: number;

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

  @typeorm.Column({ unique: false, nullable: false, type: 'varchar' })
  coverType: string;

  @typeorm.Column({ unique: false, nullable: true, type: 'boolean' })
  bestSeller: boolean;

  @typeorm.Column({ unique: false, nullable: false, type: 'varchar' })
  description: string;

  @typeorm.Column({ unique: false, nullable: false, type: 'varchar' })
  image: string;

  @typeorm.Column({ unique: false, nullable: false, type: 'date' })
  dateOfIssue: string;

  @typeorm.ManyToMany(() => Genres, (genre) => genre.books)
  @typeorm.JoinTable()
  genres: Genres[];

  @typeorm.AfterLoad()
  changeData() {
    this.image = dbHelper.getFileUrl(this.image, 'bookCovers');
    // this.price = dbHelper.valueCalculation(this.price, 100);
    // this.raiting = dbHelper.valueCalculation(this.raiting, 10);
  }
}

export default Book;
