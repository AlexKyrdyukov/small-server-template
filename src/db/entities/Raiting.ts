import * as typeorm from 'typeorm';

import { BooksEntity, UsersEntity } from '../../db';

@typeorm.Entity()
class Raiting {
  @typeorm.PrimaryGeneratedColumn()
  raitingId: number;

  @typeorm.CreateDateColumn({ select: false })
  createdDate: Date;

  @typeorm.UpdateDateColumn({ select: false })
  updatedDate: Date;

  @typeorm.DeleteDateColumn({ select: false })
  deletedDate: Date;

  @typeorm.ManyToOne(() => BooksEntity, (book) => book.bookId)
  bookId: number;

  @typeorm.ManyToOne(() => UsersEntity, (user) => user.userId)
  users: UsersEntity[];
}

export default Raiting;
