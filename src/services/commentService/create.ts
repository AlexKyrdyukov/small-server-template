import { CommentsEntity } from '../../db';

const create = async (bookId: string, comment: string) => {
  const newComment = new CommentsEntity();
  newComment.commentText = comment;
  // newComment.book =
  // newComment.userComments =
  console.log(bookId, comment);
};

export default create;
