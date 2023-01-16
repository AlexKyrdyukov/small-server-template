import { Entity, Column, PrimaryGeneratedColumn, AfterLoad, ManyToMany, JoinTable } from 'typeorm';
import config from '../../config';
import Genres from './Genres';

@Entity()
class Books {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false, type: 'varchar' })
  name: string;

  @Column({ unique: true, nullable: false, type: 'varchar' })
  author: string;

  @Column({ unique: false, nullable: true, type: 'integer' })
  price?: number;

  @Column({ unique: false, nullable: true, type: 'integer' })
  raiting: number;

  @Column({ unique: false, nullable: false, type: 'varchar' })
  coverType: string;

  @Column({ unique: false, nullable: true, type: 'varchar' })
  annotation?: string | null;

  @Column({ unique: false, nullable: false, type: 'varchar' })
  image: string;

  @ManyToMany(() => Genres)
  @JoinTable()
  genres: Genres[];

  @AfterLoad()
  changeData() {
    this.image = `${config.urls.current}/bookCover/${this.image}`;
    this.price /= 100;
    this.raiting /= 10;
  }
}

export default Books;
