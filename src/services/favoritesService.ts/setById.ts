import type { UsersEntity } from '../../db';
import { bookService } from '../../services';

const setById = async (bookId: number, user: UsersEntity) => {
  console.log(user.favoriteBooks);
  const book = await bookService.getById(bookId);
  console.log('event', book);
  book = [...book.userFavorites, user];
  const savedBook = await bookService.update(book);
  return savedBook;
};

export default setById;
