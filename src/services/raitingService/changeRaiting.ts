import db, { RaitingsEntity } from '../../db';
import type { BooksEntity, UsersEntity } from '../../db';

const changeRaiting = async (
  book: BooksEntity,
  user: UsersEntity,
  newRaitingValue: number,
) => {
  const index = book.bookRaitings.findIndex((item) => item.userId === user);
  // if (index !== -1) {
  const raiting = new RaitingsEntity();
  raiting.bookId = book;
  raiting.userId = user;
  raiting.raiting = Math.round(newRaitingValue * 10);
  raiting.raitingIds = Math.round(newRaitingValue * 10);
  await db.raiting.save(raiting);
  // }
  console.log('allRaitings:', book, 'user:', user, 'rate:', newRaitingValue);
};

export default changeRaiting;
