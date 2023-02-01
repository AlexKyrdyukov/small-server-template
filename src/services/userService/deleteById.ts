import type { UsersEntity } from '../../db';
import db from '../../db';
import { fileHelpers } from '../../utils';

const deleteById = async (user: UsersEntity) => {
  fileHelpers.removeImage(user.avatar, 'avatars');
  await db.user.remove(user);
};

export default deleteById;
