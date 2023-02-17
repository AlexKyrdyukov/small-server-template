import sharedValidation from './sharedValidation';

const addById = {
  body: {
    bookId: sharedValidation.bookId,
  },
};

const deleteById = {
  params: {
    bookId: sharedValidation.bookId,
  },
};

export default {
  addById,
  deleteById,
};
