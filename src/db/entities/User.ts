import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', select: false })
  password: string;

  @Column({
    nullable: false, type: 'varchar' })
  fullName: string;

  @Column({
    unique: true, nullable: false, type: 'varchar' })
  email: string;

  @Column({ type: 'date' })
  dob: Date | string;
}

export default User;
