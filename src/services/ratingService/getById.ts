import db from '../../db';

const getRating = async (bookId: number) => {
  const query = await db.rating
    .createQueryBuilder('rating')
    .leftJoinAndSelect('rating.book', 'book')
    .leftJoinAndSelect('rating.user', 'user')
    .andWhere('book.bookId =:bookId', { bookId })
    .getManyAndCount();
  return query;
};

export default getRating;
