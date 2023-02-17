import { user, auth } from './sharedValidation';

const updatedPass = {
  body: {
    password: auth.requiredPassword,
    newPassword: auth.requiredPassword,
  },
  params: {
    userId: user.requiredUserId,
  },
};

const updatedUser = {
  body: {
    fullName: user.fullName,
    email: auth.requiredEmail,
  },
  params: {
    userId: user.requiredUserId,
  },
};

const deleteUser = {
  params: {
    userId: user.requiredUserId,
  },
};

const loadAvatar = {
  body: {
    file: user.file,
  },
  params: {
    userId: user.requiredUserId,
  },
};

export default {
  loadAvatar,
  updatedPass,
  updatedUser,
  deleteUser,
};
