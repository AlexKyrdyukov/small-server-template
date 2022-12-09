import jwt from 'jsonwebtoken';
import config from '../config';

const create = (id: number) => {
  return jwt.sign({ id }, config.token.secret, { algorithm: 'HS512', expiresIn: '1h' });
};

const decoded = (token: string) => {
  return jwt.verify(token, config.token.secret) as {id: number};
};

export default {
  create,
  decoded,
};
