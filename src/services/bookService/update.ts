import type { BooksEntity } from '../../db';
import db from '../../db';

const update = async (book: BooksEntity) => {
  await db.books.save(book);
};

export default update;
