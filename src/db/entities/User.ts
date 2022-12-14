import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', select: false, nullable: false })
  password: string;

  @Column({ nullable: true, type: 'varchar' })
  fullName: string;

  @Column({ unique: true, nullable: false, type: 'varchar' })
  email: string;

  @Column({ type: 'date', nullable: true })
  dob: Date | string;
}

export default User;
