import db from '../../db';

const getById = async (bookId: number) => {
  // eslint-disable-next-line no-console
  console.log('getById', bookId);
  const query = await db.raiting
    .createQueryBuilder('raiting')
    .where('raiting.bookId = :bookId', { bookId })
    .leftJoinAndSelect('raiting.bookId', 'bookId')
    .leftJoinAndSelect('raiting.users', 'users')
    .getOne();
  // eslint-disable-next-line no-console
  console.log(query);
  return query;
};

export default getById;
