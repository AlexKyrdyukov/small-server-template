import { StatusCodes } from 'http-status-codes';

import { CustomError, errorMessages } from '../utils';

const chechAuth = (auth: string) => {
  const [authType, token] = auth.split(' ');
  if (authType !== 'Bearer') {
    throw new CustomError(
      StatusCodes.FORBIDDEN, errorMessages.USER_INCORRECTLY_AUTHORIZATION_TYPE,
    );
  }
  return token;
};

export default chechAuth;
