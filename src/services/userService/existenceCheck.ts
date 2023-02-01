import db from '../../db';
import { Exception } from '../../services';
import { errorTypes } from '../../utils';

const existenceCheck = async (userProperty: string) => {
  const user = await db.user.findOne({
    where: {
      email: userProperty,
    },
  });
  if (user) {
    throw Exception.createError(errorTypes.BAD_REQUEST_USER_ALREADY_EXIST);
  }
};

export default existenceCheck;
