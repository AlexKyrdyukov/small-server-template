import * as yup from 'yup';

const registarationSchema = yup.object({
  body: yup.object({

    fullName: yup.string().trim().max(25, 'please enter correctly name & last name').required('this field is required'),

    dob: yup.date().required('this field is required example enter: YYYY-MM-DD '),

    email: yup.string().trim().required('this field is required').email('please enter valid email'),

    password: yup.string().trim().required('this field is required').min(3, 'password cannot be shorter than 3 characters')
      .max(8, 'password cannot be longer than 8 character'),
  }),
});

const validationSchema = yup.object({
  body: yup.object({

    email: yup.string().trim().required('this field is required').email('please enter valid email'),

    password: yup.string().trim().required('this field is required').min(3, 'password cannot be shorter than 3 characters')
      .max(8, 'password cannot be longer than 8 character'),
  }),
});

const updatedPassSchema = yup.object().shape({
  body: yup.object({
    oldPassword: yup.string().trim().ensure().required('this field is required')
      .min(3, 'password cannot be shorter than 3 characters')
      .max(8, 'password cannot be longer than 8 character'),

    newPassword: yup.string().trim().ensure().notOneOf([yup.ref('oldPassword')], 'old Password & new password dont must match')
      .required('this field is required')
      .min(3, 'password cannot be shorter than 3 characters')
      .max(8, 'password cannot be longer than 8 character'),

    repeatNewPassword: yup.string().trim().ensure().oneOf([yup.ref('newPassword')], 'entered new passwords must match')
      .required('this field is required')
      .min(3, 'password cannot be shorter than 3 characters')
      .max(8, 'password cannot be longer than 8 character'),
  }),

});

const updatedUserSchema = yup.object().shape({
  body: yup.object({

    newName: yup.string().trim().ensure().max(25, 'please enter correctly name & last name')
      .required('this field is required'),

    newEmail: yup.string().trim().ensure().required('this field is required')
      .email('please enter valid email'),

    newDob: yup.date().required('this field is required'),
  }),
});

export default {
  registarationSchema,
  validationSchema,
  updatedPassSchema,
  updatedUserSchema,
};

export type SchemaType = typeof registarationSchema |
 typeof validationSchema |
 typeof updatedPassSchema |
 typeof updatedUserSchema;
