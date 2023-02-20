import type { UsersEntity } from '../../db';
import { bookService } from '..';

const addById = async (bookId: number, user: UsersEntity) => {
  const book = await bookService.getById(bookId);
  book.userFavorites = [user];
  const savedBook = await bookService.update(book);
  delete savedBook.userFavorites;
  return savedBook;
};

export default addById;
