import * as typeorm from 'typeorm';

import { dbHelpers } from '../../utils';

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
    this.avatar = dbHelpers.getFileUrl(this.avatar, 'userAvatars');
  }
}

export default User;
