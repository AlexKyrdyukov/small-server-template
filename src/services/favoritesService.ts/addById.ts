import type { UsersEntity } from '../../db';
import { bookService } from '..';
import db from '../../db';

const addById = async (bookId: number, user: UsersEntity) => {
  const book = await bookService.getById(bookId);
  book.userFavorites = [user];
  const savedBook = await db.books.save(book);
  delete savedBook.userFavorites;
  return savedBook;
};

export default addById;
