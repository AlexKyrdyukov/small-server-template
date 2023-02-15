import { StatusCodes } from 'http-status-codes';

import errorMessages from '../utils/errorMessages';

const UNAUTHORIZED_USER_LOG_IN = {
  status: StatusCodes.UNAUTHORIZED,
  message: errorMessages.USER_SIGN_IN,
};
const NOT_FOUND_USER_NOT_FOUND = {
  status: StatusCodes.NOT_FOUND,
  message: errorMessages.USER_NOT_FOUND,
};
const BAD_REQUEST_USER_ALREADY_EXIST = {
  status: StatusCodes.BAD_REQUEST,
  message: errorMessages.USER_ALREADY_EXISTS,
};

const BAD_REQUEST_INVALID_PASSWORD = {
  status: StatusCodes.BAD_REQUEST,
  message: errorMessages.USER_INVALID_PASSWORD,
};

const FORBIDDEN_UNKNOWN_AUTHORIZATION_TYPE = {
  status: StatusCodes.FORBIDDEN,
  message: errorMessages.USER_INCORRECTLY_AUTHORIZATION_TYPE,
};

const FORBIDDEN_USER_LOG_IN = {
  status: StatusCodes.FORBIDDEN,
  message: errorMessages.USER_SIGN_IN,
};

const FORBIDDEN_INVALID_REQUEST = {
  status: StatusCodes.FORBIDDEN,
  message: errorMessages.USER_INVALID_REQUEST,
};

export default {
  UNAUTHORIZED_USER_LOG_IN,
  NOT_FOUND_USER_NOT_FOUND,
  BAD_REQUEST_USER_ALREADY_EXIST,
  BAD_REQUEST_INVALID_PASSWORD,
  FORBIDDEN_INVALID_REQUEST,
  FORBIDDEN_UNKNOWN_AUTHORIZATION_TYPE,
  FORBIDDEN_USER_LOG_IN,
};
