import db, { RatingsEntity } from '../../db';
import type { BooksEntity, UsersEntity } from '../../db';
import { ratingService } from '../../services';
import bookService from '../bookService';

const changeRating = async (
  book: BooksEntity,
  user: UsersEntity,
  newRatingValue: number,
) => {
  const updateBook = book;
  const averageRating = book.averageRating;
  const newUserRating = Number(newRatingValue) * 10;
  // eslint-disable-next-line no-console
  console.log('averageRating', averageRating, 'newRating', newUserRating);
  const [ratingsBook, totalCount] = await ratingService.getById(book.bookId);
  // eslint-disable-next-line no-console
  const index = ratingsBook.findIndex((item) => item.user.userId === user.userId);
  const oneUserRating = ratingsBook[index];

  // eslint-disable-next-line no-console
  console.log('index', index);
  if (index !== -1) {
    const oldUserRating = ratingsBook[index].rating;
    console.log('oldUserRating', oldUserRating);
    const newAverageRating = ((averageRating * totalCount) - oldUserRating) / totalCount; //
    console.log('newAverageRating', newAverageRating);
    updateBook.averageRating = newAverageRating;
    await bookService.update(updateBook);
  }

  // const raiting = new RaitingsEntity();
  // raiting.book = book;
  // raiting.user = user;
  // raiting.raiting = Math.round(newRaitingValue * 10);
  // const b = await db.raiting.save(raiting);
  // console.log('b', b);
};

export default changeRating;
