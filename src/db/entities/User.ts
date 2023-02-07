import * as typeorm from 'typeorm';
import { BooksEntity } from '..';

import { fileHelpers } from '../../utils';

@typeorm.Entity()
class User {
  @typeorm.PrimaryGeneratedColumn()
  userId: number;

  @typeorm.CreateDateColumn({ select: false })
  createdDate: Date;

  @typeorm.UpdateDateColumn({ select: false })
  updatedDate: Date;

  @typeorm.DeleteDateColumn({ select: false })
  deletedDate: Date;

  @typeorm.Column({ unique: false, nullable: false, type: 'varchar', select: false })
  password: string;

  @typeorm.Column({ unique: false, nullable: true, type: 'varchar' })
  fullName: string;

  @typeorm.Column({ unique: true, nullable: false, type: 'varchar' })
  email: string;

  @typeorm.Column({ unique: false, nullable: true, type: 'varchar' })
  avatar?: string;

  @typeorm.ManyToMany(() => BooksEntity, (book) => book.bookId)
  @typeorm.JoinTable()
  likeBooks: BooksEntity[];

  @typeorm.AfterLoad()
  changeData() {
    this.avatar = fileHelpers.getUrlImage(this.avatar, 'userAvatars');
  }
}

export default User;
