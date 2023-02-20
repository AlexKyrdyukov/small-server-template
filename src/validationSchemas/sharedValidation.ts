import * as yup from 'yup';

const email = yup.string()
  .trim()
  .lowercase()
  .email('please enter valid email');

const password = yup.string()
  .trim()
  .min(3, 'password cannot be shorter than 3 characters')
  .max(8, 'password cannot be longer than 8 character');

const token = yup.string()
  .trim().required();

const fullName = yup.string()
  .trim()
  .max(25, 'please enter correctly name & last name')
  .test('is-full-name', 'Please enter both your first and last name', (value) => {
    const nameArray = value?.split(' ');
    return nameArray!.length >= 2;
  });

const params = yup.string();
const rating = yup.number();
const text = yup.string().trim();
const file = yup.string().required();
const userId = yup.number().integer().positive();
const requiredUserId = userId.required();
const requiredEmail = email.required('field email is required');
const requiredPassword = password.required('field password is required');
const bookId = yup.number().integer().positive();
const quantity = yup.number().integer();
const requiredFullName = fullName.required('field fullname is required');

export default {
  file,
  text,
  email,
  token,
  rating,
  bookId,
  params,
  userId,
  fullName,
  quantity,
  password,
  requiredEmail,
  requiredUserId,
  requiredFullName,
  requiredPassword,
};
