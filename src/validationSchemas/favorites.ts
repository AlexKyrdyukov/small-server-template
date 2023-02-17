import { book } from './sharedValidation';

const addById = {
  body: {
    bookId: book.bookId,
  },
};

const deleteById = {
  params: {
    bookId: book.bookId,
  },
};

export default {
  addById,
  deleteById,
};
