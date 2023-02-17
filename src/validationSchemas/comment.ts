import sharedValidation from './sharedValidation';

const create = {
  body: {
    bookId: sharedValidation.bookId,
    comment: sharedValidation.text,
  },
};

export default {
  create,
};
