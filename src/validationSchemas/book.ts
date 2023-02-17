import { book } from './sharedValidation';

const filtered = {
  query: {
    sortDirection: book.params,
    sortBy: book.params,
    perPage: book.params,
    page: book.params,
    search: book.params,
    genres: book.params,
    minPrice: book.params,
    maxPrice: book.params,
  },
};

const getById = {
  params: {
    bookId: book.bookId,
  },
};

export default {
  filtered,
  getById,
};
