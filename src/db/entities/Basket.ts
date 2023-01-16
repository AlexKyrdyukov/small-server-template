import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Book from './Book';

@Entity()
class Basket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', nullable: false })
  userId: number;

  @OneToMany(() => Book, (book) => book.id)
  books: Book[];
}

export default Basket;
