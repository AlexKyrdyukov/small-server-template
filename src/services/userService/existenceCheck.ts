import db from '../../db';
import { errorTypes } from '../../utils';
import { Exception } from '../../services';

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
