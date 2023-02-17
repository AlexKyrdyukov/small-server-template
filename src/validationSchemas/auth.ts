import { auth } from './sharedValidation';

const signUp = {
  body: {
    email: auth.requiredEmail,
    password: auth.requiredPassword,
  },
};

const signIn = {
  body: {
    email: auth.requiredEmail,
    password: auth.requiredPassword,
  },
};

export default {
  signIn,
  signUp,
};
