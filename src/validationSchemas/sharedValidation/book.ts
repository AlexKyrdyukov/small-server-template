import * as yup from 'yup';

const params = yup.string();

const bookId = yup.number().integer().positive();

const quantity = yup.number().integer().positive();

const rating = yup.number();

export default {
  params,
  bookId,
  quantity,
  rating,
};
