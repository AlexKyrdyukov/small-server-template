import { errorTypes } from '../../utils';
import { Exception } from '../../services';

const checkAuthType = (authorization: string) => {
  const [auth, token] = authorization.split(' ');

  if (auth !== 'Bearer') {
    throw Exception.createError(errorTypes.FORBIDDEN_UNKNOWN_AUTHORIZATION_TYPE);
  }

  return token;
};

export default checkAuthType;
