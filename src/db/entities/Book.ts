import { Entity, Column, PrimaryGeneratedColumn, AfterLoad, ManyToMany, JoinTable } from 'typeorm';

import Genres from './Genres';

import dbHelper from '../../utils/dbHelper';

@Entity()
class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: false, nullable: false, type: 'varchar' })
  name: string;

  @Column({ unique: false, nullable: false, type: 'varchar' })
  author: string;

  @Column({ unique: false, nullable: false, type: 'decimal' })
  price: number;

  @Column({ unique: false, nullable: false, type: 'integer' })
  raiting: number;

  @Column({ unique: false, nullable: false, type: 'boolean' })
  isAvailable: boolean;

  @Column({ unique: false, nullable: false, type: 'varchar' })
  coverType: string;

  @Column({ unique: false, nullable: true, type: 'varchar' })
  annotation?: string | null;

  @Column({ unique: false, nullable: false, type: 'varchar' })
  description: string;

  @Column({ unique: false, nullable: false, type: 'varchar' })
  image: string;

  @Column({ unique: false, nullable: false, type: 'date' })
  dateOfIssue: string;

  @ManyToMany(() => Genres)
  @JoinTable()
  genres: Genres[];

  @AfterLoad()
  changeData() {
    this.image = dbHelper.changePath(this.image, 'bookCover');
    this.price = dbHelper.valueCalculation(this.price, 100);
    this.raiting = dbHelper.valueCalculation(this.raiting, 10);
  }
}

export default Book;
