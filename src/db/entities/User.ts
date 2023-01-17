import { Entity, Column, PrimaryGeneratedColumn, AfterLoad } from 'typeorm';

import dbHelper from '../../utils/dbHelper';

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

  @Column({ unique: false, type: 'varchar', nullable: true })
  avatar?: string;

  @AfterLoad()
  changeData() {
    this.avatar = dbHelper.changePath(this.avatar, 'userAvatar');
  }
}

export default User;
