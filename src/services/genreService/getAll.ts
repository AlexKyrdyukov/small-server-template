import db from '../../db';

const getBooks = async () => {
  const books = await db.genres.find();
  return books;
};

export default getBooks;
