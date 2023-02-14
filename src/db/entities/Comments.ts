import * as typeorm from 'typeorm';
import { UsersEntity, BooksEntity } from '..';

@typeorm.Entity()
class Comment {
  @typeorm.PrimaryGeneratedColumn()
  commentId: number;

  @typeorm.Column({ unique: false, nullable: false, type: 'varchar' })
  commentText: string;

  @typeorm.ManyToOne(() => UsersEntity, (user) => user.comments)
  userComments: UsersEntity;

  @typeorm.ManyToOne(() => BooksEntity, (book) => book.comments)
  book: BooksEntity;
}

export default Comment;
