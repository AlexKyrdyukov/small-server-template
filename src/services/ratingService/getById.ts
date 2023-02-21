import db from '../../db';

const getRating = async (bookId: number) => {
  const query = await db.rating.findAndCount({
    relations: {
      book: true,
      user: true,
    },
    where: {
      book: {
        bookId,
      },
    },
  });
  return query;
};

export default getRating;
