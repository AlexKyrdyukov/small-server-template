import db from '../../db';

const getAll = async () => {
  const books = await db.books.find();
  return books;
};

export default getAll;
