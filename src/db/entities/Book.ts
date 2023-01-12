import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import Basket from './Basket';

@Entity()
class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false, type: 'varchar' })
  name: string;

  @Column({ unique: true, nullable: false, type: 'varchar' })
  author: string;

  @Column({ unique: false, nullable: false, type: 'varchar' })
  price: string;

  @Column({ unique: false, nullable: true, type: 'varchar' })
  raiting: string;

  @Column({ unique: false, nullable: false, type: 'boolean' })
  coverType: string;

  @Column({ unique: false, nullable: false, type: 'varchar' })
  genre: string;

  @Column({ unique: true, nullable: false, type: 'varchar' })
  image: string;

  @ManyToOne(() => Basket, (basket) => basket.books)
  basket: Basket;
}

export default Book;
