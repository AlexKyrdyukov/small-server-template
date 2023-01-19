import AppDataSource from './dataSource';

import User from './entities/User';
import Books from './entities/Book';
import Genres from './entities/Genres';
import Cart from './entities/Cart';
import Raiting from './entities/Raiting';

export { default as connectToDb } from './connectToDb';
export { default as UsersEntity } from './entities/User';
export { default as BooksEntity } from './entities/Book';
export { default as GenresEntity } from './entities/Genres';
export { default as CartsEntity } from './entities/Cart';
export { default as RaitingsEntity } from './entities/Raiting';

export default {
  user: AppDataSource.getRepository(User),
  books: AppDataSource.getRepository(Books),
  genres: AppDataSource.getRepository(Genres),
  cart: AppDataSource.getRepository(Cart),
  raiting: AppDataSource.getRepository(Raiting),
};
