import AppDataSource from './dataSource';
import User from './entities/User';
import Books from './entities/Books';
import Genres from './entities/Genres';

export default {
  user: AppDataSource.getRepository(User),
  books: AppDataSource.getRepository(Books),
  genres: AppDataSource.getRepository(Genres),
};
