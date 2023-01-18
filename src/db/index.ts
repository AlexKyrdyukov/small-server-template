import AppDataSource from './dataSource';

import User from './entities/User';
import Books from './entities/Book';
import Genres from './entities/Genres';

export { default as UserEntity } from './entities/User';
export { default as BooksEntity } from './entities/Book';
export { default as GenresEntity } from './entities/Genres';

export default {
  user: AppDataSource.getRepository(User),
  books: AppDataSource.getRepository(Books),
  genres: AppDataSource.getRepository(Genres),
};
