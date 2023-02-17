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

const refresh = {
  body: {
    token: auth.token,
  },
};

export default {
  signIn,
  signUp,
  refresh,
};
