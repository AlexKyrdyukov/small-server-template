import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
class Genres {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false, type: 'varchar' })
  name: string;

  // @ManyToMany(() => Book, (book) => book.id)
  // @JoinTable()
  // categories: Book[];
}

export default Genres;
