import * as yup from 'yup';

const userId = yup.number().integer().positive();
const requiredUserId = userId.required();

const fullName = yup.string()
  .trim()
  .max(25, 'please enter correctly name & last name')
  .test('is-full-name', 'Please enter both your first and last name', (value) => {
    const nameArray = value?.split(' ');
    return nameArray!.length >= 2;
  });
const requiredFullName = fullName.required('field fullname is required');

const email = yup.string()
  .trim()
  .lowercase()
  .email('please enter valid email');
const requiredEmail = email.required('field email is required');

const dob = yup.date();
const requiredDob = dob.required('this field is required, example enter: YYYY-DD-MM ');

const password = yup.string()
  .trim()
  .min(3, 'password cannot be shorter than 3 characters')
  .max(8, 'password cannot be longer than 8 character');
const requiredPassword = password.required('field password is required');

export default {
  userId,
  fullName,
  email,
  dob,
  password,
  requiredPassword,
  requiredDob,
  requiredEmail,
  requiredFullName,
  requiredUserId,
};
