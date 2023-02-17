import * as yup from 'yup';

const email = yup.string()
  .trim()
  .lowercase()
  .email('please enter valid email');

const password = yup.string()
  .trim()
  .min(3, 'password cannot be shorter than 3 characters')
  .max(8, 'password cannot be longer than 8 character');

const requiredEmail = email.required('field email is required');
const requiredPassword = password.required('field password is required');

export default {
  email,
  password,
  requiredEmail,
  requiredPassword,
};
