import db from '../../db';
import type { BooksEntity, UsersEntity } from '../../db';

import { ratingService, bookService } from '../../services';

const changeRating = async (
  book: BooksEntity,
  user: UsersEntity,
  newRatingValue: number,
) => {
  const updateBook = book;

  const averageRating = book.averageRating;
  const newUserRating = Number(newRatingValue) * 10;
  const [ratingsBook, totalCount] = await ratingService.getById(book.bookId);

  const index = ratingsBook.findIndex((item) => item.user.userId === user.userId);

  if (index !== -1) {
    const updateRaiting = ratingsBook[index];
    const oldUserRating = ratingsBook[index].rating;

    const newAverageRating = (
      ((averageRating * totalCount) - oldUserRating) + newUserRating) / totalCount;
    updateBook.averageRating = Math.round(newAverageRating);

    await bookService.update(updateBook);
    updateRaiting.book = updateBook;
    updateRaiting.rating = newUserRating;
    await db.rating.save(updateRaiting);
    return (newAverageRating / 10).toFixed(1);
  }

  const newAverageRating = ((averageRating * totalCount) + newUserRating) / (totalCount + 1);
  updateBook.averageRating = Math.round(newAverageRating);

  await bookService.update(updateBook);
  await ratingService.create(user, updateBook, newUserRating);
  return (newAverageRating / 10).toFixed(1);
};

export default changeRating;
