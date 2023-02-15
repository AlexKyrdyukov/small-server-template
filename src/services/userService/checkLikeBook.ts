import type { BooksEntity } from '../../db';
import { bookService } from '../../services';

const checkLikeBook = async (bookId: number, userFavorit: BooksEntity[]) => {
  const index = userFavorit.findIndex((item) => item.bookId === bookId);

  if (index !== -1) {
    userFavorit.splice(index, 1);
    return userFavorit;
  }

  const book = await bookService.getById(bookId);
  userFavorit.push(book);

  return userFavorit;
};

export default checkLikeBook;
