import * as yup from 'yup';

const signUp = yup.object({
  body: yup.object({
    fullName: yup.string().trim().max(25, 'please enter correctly name & last name').required('this field is required'),
    dob: yup.date().required('this field is required, example enter: YYYY-DD-MM '),
    email: yup.string().trim().required('this field is required').email('please enter valid email'),
    password: yup.string().trim()
      .min(3, 'password cannot be shorter than 3 characters')
      .max(8, 'password cannot be longer than 8 character')
      .required('this field is required'),
  }),
});

const signIn = yup.object({
  body: yup.object({
    email: yup.string().trim().required('this field is required').email('please enter valid email'),

    password: yup.string().trim().required('this field is required').min(3, 'password cannot be shorter than 3 characters')
      .max(8, 'password cannot be longer than 8 character'),
  }),
});

const updatedPass = yup.object({
  body: yup.object({
    password: yup.string().trim().ensure().required('this field is required')
      .min(3, 'password cannot be shorter than 3 characters')
      .max(8, 'password cannot be longer than 8 character'),

    newPassword: yup.string().trim().ensure().notOneOf([yup.ref('password')], 'old Password & new password dont must match')
      .required('this field is required')
      .min(3, 'password cannot be shorter than 3 characters')
      .max(8, 'password cannot be longer than 8 character'),
  }),
});

const updatedUser = yup.object({
  body: yup.object({
    fullName: yup.string().trim().ensure().max(25, 'please enter correctly name & last name')
      .required('this field is required'),

    email: yup.string().trim().ensure().required('this field is required')
      .email('please enter valid email'),

    dob: yup.date().required('this field is required'),
  }),
});

export default {
  signIn,
  signUp,
  updatedPass,
  updatedUser,
};
