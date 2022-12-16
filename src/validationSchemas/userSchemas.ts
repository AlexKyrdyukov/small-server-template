import sharedValidation from './dataValidation';

const signUp = {
  body: {
    fullName: sharedValidation.fullName,
    dob: sharedValidation.requiredDob,
    email: sharedValidation.requiredEmail,
    password: sharedValidation.requiredPassword,
  },
};

const signIn = {
  body: {
    email: sharedValidation.requiredEmail,
    password: sharedValidation.requiredNewPassword,
  },
};

const updatedPass = {
  body: {
    password: sharedValidation.requiredPassword,
    newPassword: sharedValidation.requiredNewPassword,
  },
  params: {
    userId: sharedValidation.requiredUserId,
  },

};

const updatedUser = {
  body: {
    fullName: sharedValidation.fullName,
    email: sharedValidation.requiredEmail,
    dob: sharedValidation.dob,
  },
  params: {
    userId: sharedValidation.requiredUserId,
  },
};

const deleteUser = {
  params: {
    userId: sharedValidation.requiredUserId,
  },
};

export default {
  signIn,
  signUp,
  updatedPass,
  updatedUser,
  deleteUser,
};
