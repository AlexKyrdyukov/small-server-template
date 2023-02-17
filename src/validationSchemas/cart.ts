import sharedValidation from './sharedValidation';

const changeById = {
  params: {
    bookId: sharedValidation.bookId,
  },
};

const changeQuantity = {
  body: {
    bookId: sharedValidation.bookId,
    quantity: sharedValidation.quantity,
  },
};

export default {
  changeById,
  changeQuantity,
};
