import { tokenService } from '../../services';
import config from '../../config';

type PayloadType = Record<string, never>;

const verifyToken = async (token: string) => {
  const payload: PayloadType = await tokenService.asyncVerify(
    token,
    config.token.secret,
    { complete: false },
  );
  return payload;
};

export default verifyToken;
