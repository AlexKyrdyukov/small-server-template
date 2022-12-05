import type { Handler } from 'express';
import repositorys from '../../db/index';

const createUser: Handler = (req, res) => {
  try {
    // eslint-disable-next-line no-console
    console.log(repositorys.userRepository);
  } catch (error) {
    console.error(error);
  }
};

export default createUser;
