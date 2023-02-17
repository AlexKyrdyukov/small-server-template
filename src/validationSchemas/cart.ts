import { book } from './sharedValidation';

const changeById = {
  params: {
    bookId: book.bookId,
  },
};

const changeQuantity = {
  body: {
    bookId: book.bookId,
    quantity: book.quantity,
  },
};

export default {
  changeById,
  changeQuantity,
};
