import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
class Genres {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false, type: 'varchar' })
  name: string;
}

export default Genres;
