import { StatusCodes } from 'http-status-codes';

import { errorMessages } from '../utils';

const logIn = { status: StatusCodes.UNAUTHORIZED, message: errorMessages.USER_SIGN_IN };
const notFOund = { status: StatusCodes.NOT_FOUND, message: errorMessages.USER_NOT_FOUND };

export default {
  logIn,
  notFOund,
};
