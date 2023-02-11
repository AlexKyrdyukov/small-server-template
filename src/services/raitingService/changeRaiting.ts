import db, { RaitingsEntity } from '../../db';
import type { BooksEntity, UsersEntity } from '../../db';

const getRaiting = async (userId: number, bookId: number) => {
  const query = await db.raiting
    .createQueryBuilder('raiting')
    .leftJoinAndSelect('raiting.bookId', 'bookId')
    .leftJoinAndSelect('raiting.userId', 'userId')
    .getOne();
  console.log(query);
  return query;
};

const changeRaiting = async (
  book: BooksEntity,
  user: UsersEntity,
  newRaitingValue: number,
) => {
  let newRaiting;
  const index = book.bookRaitings.findIndex((item) => item.userId === user.userId);
  const divider = book.bookRaitings.length + 1;
  const raitingBook = (book.raiting / 10).toFixed(1);
  // console.log(index, divider, raitingBook);
  const a = await getRaiting(user.userId, book.bookId);
  console.log(a);
  if (index !== -1) {
    newRaiting = ((Number(raitingBook) * divider) - newRaitingValue) / divider;
  } else {
    newRaiting = ((Number(raitingBook) * divider) + newRaitingValue) / divider;
  }
  // console.log(newRaiting);
  const raiting = new RaitingsEntity();
  raiting.bookId = book.bookId;
  raiting.userId = user.userId;
  raiting.raiting = Math.round(newRaitingValue * 10);
  await db.raiting.save(raiting);
};

export default changeRaiting;
