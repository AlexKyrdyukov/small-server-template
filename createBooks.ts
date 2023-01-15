import db from './src/db';
import Books from './src/db/entities/Books';
import Genres from './src/db/entities/Genres';

const genres: Array<string> = [
  'Fiction',
  'Non—fiction',
  'Light fiction',
  'Science-fiction',
  'Fantasy',
  'Business & Finance',
  'Politics',
  'Travel books',
  'Autobiography',
  'History',
  'Thriller / Mystery',
  'Romance',
  'Satire',
  'Horror',
  'Health / Medicine',
  'Children’s books',
  'Encyclopedia'];

const books: Array<Omit<Books, 'id'>> = [{
  name: 'The Psychlogy of Money',
  author: 'Morgan Housel',
  price: '$ 150.00 USD ',
  raiting: 4.0,
  coverType: 'Hardcoover || Paperback',
  image: 'img1.jpg',
  genres: ['Business & Finance', 'Science-fiction'],
}, {
  name: 'Book of Fairy Tales',
  author: 'Angela Carter',
  price: '$ 50.00 USD ',
  raiting: 5.0,
  coverType: 'Hardcoover || Paperback',
  image: 'img2.jpg',
  genres: ['Fantasy', 'Children’s books'],
}, {
  name: 'How to stop worrying and start living',
  author: 'Dale Carnegie',
  price: '$ 80.00 USD ',
  raiting: 5.0,
  coverType: 'Hardcoover || Paperback',
  image: 'img3.jpg',
  genres: ['History', 'Politics'],
}, {
  name: 'Moby Dick',
  author: 'Herman Melville',
  price: '$ 150.00 USD ',
  raiting: 5.0,
  coverType: 'Hardcoover || Paperback',
  image: 'img4.jpg',
  genres: ['Romance', 'Fantasy'],
  annotation: 'new',
}, {
  name: 'The Weight of Things',
  author: 'Marianne Flitz',
  raiting: 3.0,
  coverType: 'Hardcoover || Paperback',
  image: 'img5.jpg',
  genres: ['Business & Finance', 'Science-fiction'],
}, {
  name: 'Milk and honey',
  author: 'Rupi Kaur',
  price: null,
  raiting: 5.0,
  coverType: 'Hardcoover || Paperback',
  image: 'img6.jpg',
  genres: ['Business & Finance', 'Science-fiction'],
  annotation: 'Bestseller',
}];
const setDB = async () => {
  try {
    genres.forEach(async (item) => {
      const genre = new Genres();
      genre.name = item;
      await db.genres.save(genre);
    });
    books.forEach(async (item) => {
      const book = new Books();
      book.author = item.author;
      book.name = item.name;
      book.coverType = item.coverType;
      book.price = item?.price;
      book.annotation = item?.annotation;
      book.image = item.image;
      book.raiting = item.raiting;
      book.genres = item.genres;
      await db.books.save(book);
    });

    // eslint-disable-next-line no-console
    console.log('event');
  } catch (error) {
    console.error(error);
  }
};

export default setDB;
