import sharedValidation from './dataValidation';

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
  query: {},

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
