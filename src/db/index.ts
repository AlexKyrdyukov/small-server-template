import AppDataSource from './dataSource';
import User from './entities/User';

export default {
  user: AppDataSource.getRepository(User),
};
