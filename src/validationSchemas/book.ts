import sharedValidation from './sharedValidation';

const filtered = {
  query: {
    sortDirection: sharedValidation.params,
    sortBy: sharedValidation.params,
    perPage: sharedValidation.params,
    page: sharedValidation.params,
    search: sharedValidation.params,
    genres: sharedValidation.params,
    minPrice: sharedValidation.params,
    maxPrice: sharedValidation.params,
  },
};

const getById = {
  params: {
    bookId: sharedValidation.bookId,
  },
};

export default {
  filtered,
  getById,
};
