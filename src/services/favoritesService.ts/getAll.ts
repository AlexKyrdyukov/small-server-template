import db from '../../db';

const getAll = async (userId: number) => {
  const query = await db.books.find({
    select: {
    },
    relations: {
      userFavorites: true,
    },
    where: {
      userFavorites: {
        userId,
      },
    },
  });
  return query;
};

export default getAll;
