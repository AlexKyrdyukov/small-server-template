import db from '../../db';
import type { UsersEntity } from '../../db';
import { fileHelpers } from '../../utils';

const deleteById = async (user: UsersEntity) => {
  await fileHelpers.removeImage(user.avatar, 'avatars');
  await db.user.remove(user);
};

export default deleteById;
