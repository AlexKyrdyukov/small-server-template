import db, { RatingsEntity } from '../../db';
import type { BooksEntity, UsersEntity } from '../../db';

const create = async (
  user: UsersEntity,
  book: BooksEntity,
  ratingValue: number,
) => {
  const rating = new RatingsEntity();

  rating.book = book;
  rating.user = user;
  rating.rating = ratingValue;

  await db.rating.save(rating);
};

export default create;
