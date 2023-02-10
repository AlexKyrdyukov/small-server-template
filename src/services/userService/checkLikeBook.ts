import type { BooksEntity } from '../../db';
import bookService from '../bookService';

const checkLikeBook = async (bookId: number, userFavorit: BooksEntity[]) => {
  console.log(5, 'enter');
  const index = userFavorit.findIndex((item) => item.bookId === bookId);
  if (index !== -1) {
    userFavorit.splice(index, 1);
    return userFavorit;
  }
  console.log(11, 'enter');

  const book = await bookService.getById(bookId);
  userFavorit.push(book);
  console.log(13, 'enter');

  return userFavorit;
};

export default checkLikeBook;
