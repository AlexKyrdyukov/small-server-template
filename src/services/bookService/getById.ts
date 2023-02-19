import db from '../../db';

const getById = async (bookId: number, userId: number) => {
  const query = await db.books.find({
    where: {
      bookId,
    },
    relations: {
      userFavorites: true,
    },
    where: {
      userFavorites: {
        userId,
      },
    },
  })
  // .createQueryBuilder('book').where('book.bookId = :bookId', { bookId })
  // .leftJoinAndSelect('book.ratingIds', 'raitings')
  // .leftJoinAndSelect('book.comments', 'comments')
  // .leftJoinAndSelect('comments.user', 'user')
  // .orderBy('comments.createdDate', 'ASC')
  // .getOne();

  return query;
};

export default getById;
