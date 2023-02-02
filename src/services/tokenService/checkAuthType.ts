import { Exception } from '../../services';
import { errorTypes } from '../../utils';

const checkAuthType = (authorization: string) => {
  const [auth, token] = authorization.split(' ');
  if (auth !== 'Bearer') {
    throw Exception.createError(errorTypes.FORBIDDEN_UNKNOWN_AUTHORIZATION_TYPE);
  }
  return token;
};

export default checkAuthType;
