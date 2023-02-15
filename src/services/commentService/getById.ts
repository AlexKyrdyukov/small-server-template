import db from '../../db';

const getById = async (bookId: number) => {
  const query = await db.comment
    .createQueryBuilder('comment')
    .leftJoinAndSelect('comment.user', 'user')
    .leftJoin('comment.book', 'book')
    .where('book.bookId = :bookId', { bookId })
    .orderBy('comment.createdDate', 'ASC')
    .getMany();

  return query;
};

export default getById;
