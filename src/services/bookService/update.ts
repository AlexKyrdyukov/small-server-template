import db from '../../db';
import type { BooksEntity } from '../../db';

const update = async (book: BooksEntity) => {
  const updateBook = await db.books.save(book);
  return updateBook;
};

export default update;
