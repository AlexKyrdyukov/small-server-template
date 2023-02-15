import * as typeorm from 'typeorm';

import { UsersEntity, BooksEntity } from '../../db';

@typeorm.Entity()
class Comment {
  @typeorm.PrimaryGeneratedColumn()
  commentId: number;

  @typeorm.CreateDateColumn()
  createdDate: Date;

  @typeorm.UpdateDateColumn({ select: false })
  updatedDate: Date;

  @typeorm.DeleteDateColumn({ select: false })
  deletedDate: Date;

  @typeorm.Column({ unique: false, nullable: false, type: 'varchar' })
  commentText: string;

  @typeorm.ManyToOne(() => UsersEntity, (user) => user.comments)
  user: UsersEntity;

  @typeorm.ManyToOne(() => BooksEntity, (book) => book.comments)
  book: BooksEntity;
}

export default Comment;
