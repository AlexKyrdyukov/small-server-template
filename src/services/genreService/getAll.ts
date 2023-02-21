import db from '../../db';

const getAll = async () => {
  const books = await db.genres.find();
  return books;
};

export default getAll;
