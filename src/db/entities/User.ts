import * as typeorm from 'typeorm';

import dbHelper from '../../utils/dbHelper';

@typeorm.Entity()
class User {
  @typeorm.PrimaryGeneratedColumn()
  userId: number;

  @typeorm.Column({ unique: false, nullable: false, type: 'varchar', select: false })
  password: string;

  @typeorm.Column({ unique: false, nullable: true, type: 'varchar' })
  fullName: string;

  @typeorm.Column({ unique: true, nullable: false, type: 'varchar' })
  email: string;

  @typeorm.Column({ unique: false, nullable: true, type: 'varchar' })
  avatar?: string;

  @typeorm.AfterLoad()
  changeData() {
    this.avatar = dbHelper.getFileUrl(this.avatar, 'userAvatars');
  }
}

export default User;
