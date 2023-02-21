import db from '../../db';
import { bookService } from '../../services';

const deleteById = async (bookId: number, userId: number) => {
  const book = await bookService.getById(bookId);
  const index = book.userFavorites.findIndex((item) => item.userId === userId);
  if (index === -1) {
    return;
  }
  book.userFavorites.splice(index, 1);
  await db.books.save(book);
};

export default deleteById;
