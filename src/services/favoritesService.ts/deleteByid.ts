import { bookService } from '../../services';

const deleteById = async (bookId: number, userId: number) => {
  const book = await bookService.getById(bookId);
  const index = book.userFavorites.findIndex((item) => item.userId === userId);
  if (index !== -1) {
    book.userFavorites.splice(index, 1);
    await bookService.update(book);
  }
};

export default deleteById;
