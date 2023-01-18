import sharedValidation from './sharedValidation';

const signUp = {
  body: {
    email: sharedValidation.requiredEmail,
    password: sharedValidation.requiredPassword,
  },
};

const signIn = {
  body: {
    email: sharedValidation.requiredEmail,
    password: sharedValidation.requiredPassword,
  },
};

export default {
  signIn,
  signUp,
};
