import db from '../db';

const getBooks = async () => {
  const books = await db.books.find();
  return books;
};

const getBookById = async (bookId: number) => {
  const book = await db.books.findOne({ where: { bookId } });
  return book;
};

export default {
  getBooks,
  getBookById,
};
