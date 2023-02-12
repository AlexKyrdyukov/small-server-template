import AppDataSource from './dataSource';

import User from './entities/User';
import Books from './entities/Book';
import Genres from './entities/Genres';
import Cart from './entities/Cart';
import Rating from './entities/Rating';
import Comment from './entities/Comments';
import CartProduct from './entities/CartProduct';

export { default as connectToDb } from './connectToDb';
export { default as UsersEntity } from './entities/User';
export { default as BooksEntity } from './entities/Book';
export { default as GenresEntity } from './entities/Genres';
export { default as CartsEntity } from './entities/Cart';
export { default as RatingsEntity } from './entities/Rating';
export { default as CommentsEntity } from './entities/Comments';
export { default as CartProductsEntity } from './entities/CartProduct';

export default {
  user: AppDataSource.getRepository(User),
  books: AppDataSource.getRepository(Books),
  genres: AppDataSource.getRepository(Genres),
  cart: AppDataSource.getRepository(Cart),
  rating: AppDataSource.getRepository(Rating),
  comment: AppDataSource.getRepository(Comment),
  cartProduct: AppDataSource.getRepository(CartProduct),
};
