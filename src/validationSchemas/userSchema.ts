import * as yup from 'yup';

const sample = {
  fullName: yup.string()
    .ensure()
    .trim()
    .max(25, 'please enter correctly name & last name')
    .required('this field is required'),

  email: yup.string()
    .ensure()
    .trim()
    .ensure()
    .required('this field is required')
    .lowercase()
    .email('please enter valid email'),

  dob: yup.date().required('this field is required, example enter: YYYY-DD-MM '),

  password: yup.string()
    .ensure()
    .trim()
    .min(3, 'password cannot be shorter than 3 characters')
    .max(8, 'password cannot be longer than 8 character')
    .required('this field is required'),

  newPassword: yup.string().trim()
    .ensure()
    .notOneOf([yup.ref('password')], 'old Password & new password dont must match')
    .required('this field is required')
    .min(3, 'password cannot be shorter than 3 characters')
    .max(8, 'password cannot be longer than 8 character'),
  id: yup.number().integer().positive().required(),
};

const signUp = yup.object({
  body: yup.object({
    fullName: sample.fullName,
    dob: sample.dob,
    email: sample.email,
    password: sample.password,
  }),
});

const signIn = yup.object({
  body: yup.object({
    email: sample.email,
    password: sample.password,
  }),
});

const updatedPass = yup.object({
  body: yup.object({
    password: sample.password,
    newPassword: sample.newPassword,
  }),
  params: yup.object({
    userId: sample.id,
  }),
});

const updatedUser = yup.object({
  body: yup.object({
    fullName: sample.fullName,
    email: sample.email,
    dob: sample.dob,
  }),
  params: yup.object({
    userId: sample.id,
  }),
});

const deleteUser = yup.object({
  params: yup.object({
    userId: sample.id,
  }),
});

export default {
  signIn,
  signUp,
  updatedPass,
  updatedUser,
  deleteUser,
};
