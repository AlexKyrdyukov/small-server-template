import { book } from './sharedValidation';

const change = {
  body: {
    bookId: book.bookId,
    rating: book.rating,
  },
};

export default {
  change,
};
