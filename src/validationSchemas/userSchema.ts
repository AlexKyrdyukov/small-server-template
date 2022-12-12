import * as yup from 'yup';
// import type User from '../db/entities/User';
// import type { RequiredObjectSchema } from 'yup/lib/object';

const paramsId = yup.number().integer().positive();
const requiredParamsId = paramsId.required();

const bodyFullName = yup.string()
  .ensure()
  .trim()
  .max(25, 'please enter correctly name & last name');
const requiredFullName = bodyFullName.required('this field is required');

const bodyEmail = yup.string()
  .ensure()
  .trim()
  .ensure()
  .lowercase()
  .email('please enter valid email');
const requiredBodyEmail = bodyEmail.required('this field is required');

const bodyDob = yup.date();
const requiredBodyDob = bodyDob.required('this field is required, example enter: YYYY-DD-MM ');

const bodyPassword = yup.string()
  .ensure()
  .trim()
  .min(3, 'password cannot be shorter than 3 characters')
  .max(8, 'password cannot be longer than 8 character');
const requiredBodyPassword = bodyPassword.required('this field is required');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
};

const testSchema = {
  body: {
    fullName: sharedValidation.requiredFullName,
    email: sharedValidation.requiredBodyEmail,
    dob: sharedValidation.requiredBodyDob,
  },
  query: {

  },
  params: {
    userId: sharedValidation.requiredParamsId,
  },
};

export default testSchema;
// const sample = {
//   object: yup.object(),
//   fullName: yup.string()
//     .ensure()
//     .trim()
//     .max(25, 'please enter correctly name & last name')
//     .required('this field is required'),

//   email: yup.string()
//     .ensure()
//     .trim()
//     .ensure()
//     .required('this field is required')
//     .lowercase()
//     .email('please enter valid email'),

//   dob: yup.date().required('this field is required, example enter: YYYY-DD-MM '),

//   password: yup.string()
//     .ensure()
//     .trim()
//     .min(3, 'password cannot be shorter than 3 characters')
//     .max(8, 'password cannot be longer than 8 character')
//     .required('this field is required'),

//   newPassword: yup.string().trim()
//     .ensure()
//     .notOneOf([yup.ref('password')], 'old Password & new password dont must match')
//     .required('this field is required')
//     .min(3, 'password cannot be shorter than 3 characters')
//     .max(8, 'password cannot be longer than 8 character'),
//   id: yup.number().integer().positive().required(),
// };

// const signUp = {
//   body: ({
//     fullName: sample.fullName,
//     dob: sample.dob,
//     email: sample.email,
//     password: sample.password,
//   }),
// };

// const signIn = {
//   body: {
//     email: sample.email,
//     password: sample.password,
//   },
// };

// const updatedPass = {
//   body: {
//     password: sample.password,
//     newPassword: sample.newPassword,
//   },
//   params: {
//     userId: sample.id,
//   },
// };

// const updatedUser = {
//   body: {
//     fullName: sample.fullName,
//     email: sample.email,
//     dob: sample.dob,
//   },
//   params: {
//     userId: sample.id,
//   },
// };

// const deleteUser = {
//   params: {
//     userId: sample.id,
//   },
// };

// export default {
//   signIn,
//   signUp,
//   updatedPass,
//   updatedUser,
//   deleteUser,
// };
