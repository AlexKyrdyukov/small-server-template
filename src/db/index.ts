import AppDataSource from './dataSource';

import User from './entities/User';
import Books from './entities/Book';
import Genres from './entities/Genres';
import Rating from './entities/Rating';
import Comment from './entities/Comments';
import CartProducts from './entities/CartProducts';

export { default as connectToDb } from './connectToDb';
export { default as UsersEntity } from './entities/User';
export { default as BooksEntity } from './entities/Book';
export { default as GenresEntity } from './entities/Genres';
export { default as RatingsEntity } from './entities/Rating';
export { default as CommentsEntity } from './entities/Comments';
export { default as CartProductsEntity } from './entities/CartProducts';

export default {
  user: AppDataSource.getRepository(User),
  books: AppDataSource.getRepository(Books),
  genres: AppDataSource.getRepository(Genres),
  rating: AppDataSource.getRepository(Rating),
  comment: AppDataSource.getRepository(Comment),
  cartProducts: AppDataSource.getRepository(CartProducts),
};
