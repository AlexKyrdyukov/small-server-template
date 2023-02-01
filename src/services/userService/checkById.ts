import type { UsersEntity } from '../../db';
import { Exception } from '../../services';
import { errorTypes } from '../../utils';

const checkById = (user: UsersEntity, idFromFront: number) => {
  if (user.userId !== +idFromFront) {
    throw Exception.createError(errorTypes.FORBIDDEN_UNKNOWN_AUTHORIZATION_TYPE);
  }
};

export default checkById;
