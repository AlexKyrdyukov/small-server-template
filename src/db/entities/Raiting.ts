import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Book from './Book';

@Entity()
class Raiting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', nullable: false })
  userId: number;

  @OneToMany(() => Book, (book) => book.id)
  bookId: number;
}

export default Raiting;
