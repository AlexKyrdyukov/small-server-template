import * as typeorm from 'typeorm';
import { UsersEntity, BooksEntity } from '..';

@typeorm.Entity()
class Comment {
  @typeorm.PrimaryGeneratedColumn()
  commentId: number;

  @typeorm.Column({ unique: false, nullable: false, type: 'varchar' })
  commentText: string;

  @typeorm.OneToMany(() => UsersEntity, (user) => user.comment)
  userComments: UsersEntity;

  @typeorm.OneToMany(() => BooksEntity, (book) => book.comment)
  @typeorm.JoinColumn()
  book: BooksEntity;
}

export default Comment;
