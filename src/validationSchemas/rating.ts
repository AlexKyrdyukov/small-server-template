import sharedValidation from './sharedValidation';

const change = {
  body: {
    bookId: sharedValidation.bookId,
    rating: sharedValidation.rating,
  },
};

export default {
  change,
};
