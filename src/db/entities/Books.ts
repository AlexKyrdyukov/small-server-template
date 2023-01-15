import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Books {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false, type: 'varchar' })
  name: string;

  @Column({ unique: true, nullable: false, type: 'varchar' })
  author: string;

  @Column({ unique: false, nullable: true, type: 'varchar' })
  price?: string;

  @Column({ unique: false, nullable: true, type: 'float' })
  raiting: number;

  @Column({ unique: false, nullable: false, type: 'varchar' })
  coverType: string;

  @Column({ unique: false, nullable: true, type: 'varchar' })
  annotation?: string;
  // @Column({ unique: false, nullable: false, type: 'varchar' })
  // genreId: string;

  @Column({ unique: false, nullable: false, type: 'varchar' })
  image: string;

  @Column({ unique: false, nullable: false, type: 'varchar' })
  genres: Array<string>;

  // @ManyToMany(() => Genres, (genres) => genres.id)
  // genres: Genres[];
}

export default Books;
