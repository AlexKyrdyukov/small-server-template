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

  @typeorm.Column({ unique: false, nullable: false, type: 'integer' })
  raiting: number;

  @typeorm.Column({ unique: false, nullable: false, type: 'integer' })
  raitingIds: number;

  @typeorm.ManyToOne(() => BooksEntity, (book) => book.bookRaitings)
  bookId: BooksEntity;

  @typeorm.ManyToOne(() => UsersEntity, (user) => user.setRaitings)
  userId: UsersEntity;
}

export default Raiting;
