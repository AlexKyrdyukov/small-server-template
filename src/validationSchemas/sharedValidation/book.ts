import * as yup from 'yup';

const params = yup.string();

const bookId = yup.number().integer().positive();

export default {
  params,
  bookId,
};
