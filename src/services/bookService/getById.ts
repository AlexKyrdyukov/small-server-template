import db from '../../db';

const getById = async (bookId: number) => {
  const book = await db.books.findOne({ where: { bookId } });
  return book;
};

export default getById;
