import db from '../../db';

const getById = async (bookId: number) => {
  const query = await db.books
    .createQueryBuilder('book').where('book.bookId = :bookId', { bookId })
    .leftJoinAndSelect('book.ratingIds', 'raitings')
    .leftJoinAndSelect('book.comments', 'comments')
    .leftJoinAndSelect('comments.user', 'user')
    .orderBy('comments.createdDate', 'ASC')
    .getOne();
  return query;
};

export default getById;
