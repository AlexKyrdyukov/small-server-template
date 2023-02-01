import jwt from 'jsonwebtoken';

const asyncSign = async <P extends object>(
  payload: P,
  secret: string,
  options: jwt.SignOptions,
) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(
      payload,
      secret,
      options,
      (error, data) => {
        if (error) {
          return reject(error);
        }
        resolve(data);
      },
    );
  });
};

export default asyncSign;
