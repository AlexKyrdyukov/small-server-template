import * as yup from 'yup';

const paramsId = yup.number().integer().positive();
const requiredParamsId = paramsId.required();

const bodyFullName = yup.string()
  .ensure()
  .trim()
  .max(25, 'please enter correctly name & last name');
const requiredFullName = bodyFullName.required('field fullname is required');

const bodyEmail = yup.string()
  .ensure()
  .trim()
  .ensure()
  .lowercase()
  .email('please enter valid email');
const requiredBodyEmail = bodyEmail.required('field email is required');

const bodyDob = yup.date();
const requiredBodyDob = bodyDob.required('this field is required, example enter: YYYY-DD-MM ');

const bodyPassword = yup.string()
  .ensure()
  .trim()
  .min(3, 'password cannot be shorter than 3 characters')
  .max(8, 'password cannot be longer than 8 character');
const requiredBodyPassword = bodyPassword.required('field password is required');

const newPassword = yup.string().trim()
  .ensure()
  .notOneOf([yup.ref('password')], 'old Password & new password dont must match')
  .min(3, 'password cannot be shorter than 3 characters')
  .max(8, 'password cannot be longer than 8 character');

const requiredNewPassword = yup.string().trim()
  .ensure()
  .notOneOf([yup.ref('password')], 'old Password & new password dont must match')
  .required('this field is required')
  .min(3, 'password cannot be shorter than 3 characters')
  .max(8, 'password cannot be longer than 8 character');

const sharedValidation = {
  paramsId,
  requiredParamsId,
  bodyFullName,
  requiredFullName,
  bodyEmail,
  requiredBodyEmail,
  bodyPassword,
  requiredBodyPassword,
  bodyDob,
  requiredBodyDob,
  newPassword,
  requiredNewPassword,
};

const signUp = {
  body: {
    fullName: sharedValidation.requiredFullName,
    dob: sharedValidation.requiredBodyDob,
    email: sharedValidation.requiredBodyEmail,
    password: sharedValidation.bodyPassword,
  },
  params: {},
  query: {},
};

const signIn = {
  body: {
    email: sharedValidation.requiredBodyEmail,
    password: sharedValidation.requiredBodyPassword,
  },
  params: {},
  query: {},

};

const updatedPass = {
  body: {
    password: sharedValidation.requiredBodyPassword,
    newPassword: sharedValidation.requiredNewPassword,
  },
  params: {
    userId: sharedValidation.requiredParamsId,
  },
};

const updatedUser = {
  body: {
    fullName: sharedValidation.requiredFullName,
    email: sharedValidation.requiredBodyEmail,
    dob: sharedValidation.requiredBodyDob,
  },
  params: {
    userId: sharedValidation.requiredParamsId,
  },
  query: {},
};

const deleteUser = {
  body: {},
  params: {
    userId: sharedValidation.requiredParamsId,
  },
  query: {},
};

export default {
  signIn,
  signUp,
  updatedPass,
  updatedUser,
  deleteUser,
};
