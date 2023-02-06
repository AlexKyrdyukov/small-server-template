import db from '../../db';

const getFiltered = async () => {
  const books = await db.books.find();
  return books;
};

export default getFiltered;
