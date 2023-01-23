import { StatusCodes } from 'http-status-codes';

import { CustomError, errorMessages } from '../utils';

const chechAuth = (headAuthorization: string) => {
  if (!headAuthorization) {
    throw new CustomError(
      StatusCodes.FORBIDDEN, errorMessages.USER_SIGN_IN,
    );
  }
  const [authType, token] = headAuthorization.split(' ');
  if (authType !== 'Bearer') {
    throw new CustomError(
      StatusCodes.FORBIDDEN, errorMessages.USER_INCORRECTLY_AUTHORIZATION_TYPE,
    );
  }
  return token;
};

export default chechAuth;
