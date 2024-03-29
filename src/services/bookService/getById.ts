import db from '../../db';

const getById = async (bookId: number) => {
  const query = await db.books.findOne({
    where: {
      bookId,
    },
    relations: {
      userFavorites: true,
      comments: {
        user: true,
      },
    },
    order: {
      comments: {
        createdDate: 'ASC',
      },
    },
  });
  return query;
};

export default getById;
