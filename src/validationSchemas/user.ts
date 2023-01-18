import sharedValidation from './sharedValidation';

const updatedPass = {
  body: {
    password: sharedValidation.requiredPassword,
    newPassword: sharedValidation.requiredPassword,
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

const loadAvatar = {
  body: {
    file: sharedValidation.file,
  },
  params: {
    userId: sharedValidation.requiredUserId,
  },
};

export default {
  loadAvatar,
  updatedPass,
  updatedUser,
  deleteUser,
};
