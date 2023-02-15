import jwt from 'jsonwebtoken';
import { errorTypes } from '../../utils';
import { Exception } from '../../services';

const asyncVerify = async <P extends object>(
  token: string,
  secret: string,
  options: jwt.VerifyOptions,
) => {
  return new Promise<P>((resolve, reject) => {
    jwt.verify(
      token,
      secret,
      options,
      (error, data) => {
        if (error) {
          if (error.message === 'jwt expired') {
            throw Exception.createError(errorTypes.UNAUTHORIZED_USER_LOG_IN);
          }
          return reject(
            Exception.createError(errorTypes.UNAUTHORIZED_USER_LOG_IN),
          );
        }
        return resolve(data as P);
      },
    );
  });
};

export default asyncVerify;
