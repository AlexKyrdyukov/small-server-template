import db from '../../db';

const getById = async (bookId: number) => {
  console.log('bookId', bookId);
  const query = await db.books
    .createQueryBuilder('book').where('book.bookId = :bookId', { bookId })
    .leftJoinAndSelect('book.bookRaitings', 'raitings')
    .getOne();
  return query;
};

const getRaiting = async () => {
  const query = await db.raiting
    .createQueryBuilder('raiting')
    // .leftJoinAndSelect('raiting.bookId', 'bookId')
    // .leftJoinAndSelect('raiting.userId', 'userId')
    .getOne();
  console.log(query);
  return query;
};
// const a = getRaiting();
// setTimeout(getRaiting, 10000);
// console.log(a);
export default getById;
