import db from '../../db';

const getById = async (bookId: number) => {
  const query = await db.comment.find({
    relations: {
      user: true,
      book: true,
    },
    where: {
      book: {
        bookId,
      },
    },
  });
  return query;
};

export default getById;
