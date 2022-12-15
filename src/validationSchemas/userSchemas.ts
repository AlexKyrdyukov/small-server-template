import sharedValidation from './dataValidation';

const signUp = {
  body: {
    fullName: sharedValidation.requiredFullName,
    dob: sharedValidation.requiredBodyDob,
    email: sharedValidation.requiredBodyEmail,
    password: sharedValidation.bodyPassword,
  },
};

const signIn = {
  body: {
    email: sharedValidation.requiredBodyEmail,
    password: sharedValidation.requiredBodyPassword,
  },
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
};

const deleteUser = {
  params: {
    userId: sharedValidation.requiredParamsId,
  },
};

export default {
  signIn,
  signUp,
  updatedPass,
  updatedUser,
  deleteUser,
};
