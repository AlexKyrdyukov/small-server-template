import jwt from 'jsonwebtoken';
import { Exception } from '../../services';
import { errorTypes } from '../../utils';

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
