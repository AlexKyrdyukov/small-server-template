import { comment, book } from './sharedValidation';

const create = {
  body: {
    bookId: book.bookId,
    comment: comment.text,
  },
};

export default {
  create,
};
