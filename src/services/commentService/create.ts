import db, { CommentsEntity } from '../../db';
import type { UsersEntity } from '../../db';
import { bookService } from '../../services';

const create = async (bookId: number, comment: string, user: UsersEntity) => {
  const newComment = new CommentsEntity();
  const book = await bookService.getById(bookId);
  newComment.commentText = comment;
  newComment.book = book;
  newComment.user = user;
  db.comment.save(newComment);
  return book;
};

export default create;
