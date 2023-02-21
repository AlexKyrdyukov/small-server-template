import type { UsersEntity } from '../../db';
import { userService } from '../../services';
import { fileHelpers } from '../../utils';

const loadAvatar = async (
  oldAvatar: string,
  newFile: string,
  user: UsersEntity,
) => {
  if (oldAvatar) {
    await fileHelpers.removeImage(oldAvatar, 'avatars');
  }
  const [meta, image] = newFile.split(',');
  const file = fileHelpers.convertBase64ToBuffer(image);
  const fileName = fileHelpers.createFileName(meta);

  await fileHelpers.writeImage(file, 'avatars', fileName);
  await userService.update({ avatar: fileName }, user);

  const avatarUrl = fileHelpers.getUrlImage(fileName, 'userAvatars');
  return avatarUrl;
};

export default loadAvatar;
