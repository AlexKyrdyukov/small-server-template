import db from '../../db';
import type { BooksEntity } from '../../db';

const update = async (book: BooksEntity) => {
  await db.books.save(book);
};

export default update;
