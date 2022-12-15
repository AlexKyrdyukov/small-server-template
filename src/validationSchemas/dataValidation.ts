import * as yup from 'yup';

const userId = yup.number().integer().positive();
const requiredUserId = userId.required();

const fullName = yup.string()
  .trim()
  .max(25, 'please enter correctly name & last name');
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

const newPassword = yup.string()
  .trim()
  .notOneOf([yup.ref('password')], 'old Password & new password dont must match')
  .min(3, 'password cannot be shorter than 3 characters')
  .max(8, 'password cannot be longer than 8 character');

const requiredNewPassword = yup.string()
  .trim()
  .notOneOf([yup.ref('password')], 'old Password & new password dont must match')
  .required('this field is required')
  .min(3, 'password cannot be shorter than 3 characters')
  .max(8, 'password cannot be longer than 8 character');

export default {
  paramsId: userId,
  requiredParamsId: requiredUserId,
  bodyFullName: fullName,
  requiredFullName,
  bodyEmail: email,
  requiredBodyEmail: requiredEmail,
  bodyPassword: password,
  requiredBodyPassword: requiredPassword,
  dob,
  requiredBodyDob: requiredDob,
  newPassword,
  requiredNewPassword,
};
