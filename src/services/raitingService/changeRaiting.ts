import type { BooksEntity, RaitingsEntity, UsersEntity } from '../../db';
import bookService from '../bookService';

const changeRaiting = async (
  book: BooksEntity,
  user: UsersEntity,
  newRaitingValue: number,
) => {
  // const raiting = book.raiting;
  // const allRaitings = book.raitingUsers;

  // eslint-disable-next-line no-console
  console.log('allRaitings:', book, 'user:', user, 'rate:', newRaitingValue);
};

export default changeRaiting;
