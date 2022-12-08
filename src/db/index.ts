import AppDataSource from './dataSource';
import User from './entities/User';

const userRepository = {
  userRepository: AppDataSource.getRepository(User),
};

export default userRepository;

// export {
//   user: AppDataSource.getRepository(User),
// };
