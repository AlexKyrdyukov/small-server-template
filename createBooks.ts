import db from './src/db';
import connectToDb from './src/db/connectToDb';
import Book from './src/db/entities/Book';
import Genres from './src/db/entities/Genres';

const genres = [
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
  'Children\'s books',
  'Encyclopedia'];

const author = [
  'Morgan Housel',
  'Angela Carter',
  'Dale Carnegie',
  'Herman Melville',
  'Marianne Flitz',
  'Rupi Kaur'];

const name = [
  'The Two towers',
  'Book of Fairy Tales',
  'The Crying book',
  'Moby Dick',
  'The Weight of Things',
  'Milk and honey'];

const price = [14200, 8850, 9320, 11000, 13000, 39000];

const raiting = [40, 46, 33, 26, 13, 37];

const coverType = ['Hardcover', 'Paperback'];

const bookCovers = [
  'cover_1.svg',
  'cover_2.svg',
  'cover_3.svg',
  'cover_4.svg',
  'cover_5.svg',
  'cover_6.svg'];

const dateIssue = [
  '1999-10-31',
  '1878-12-18',
  '1889-04-20',
  '1952-10-07',
  '1870-04-22',
  '1934-03-09',
];

const description =
  // eslint-disable-next-line no-multi-str
  '“Rupi Kaur is the Writer of the Decade.” – The New Republic\
  #1 New York Times bestseller milk and honey is a collection of poetry and prose\
  about survival.About the experience of violence, abuse, love, loss, and femininity.\
  The book is divided into four chapters, and each chapter serves a different purpose.\
  Deals with a different pain.Heals a different heartache.milk and honey takes readers \
  through a journey of the most bitter moments in life and finds sweetness in them because\
  there is sweetness everywhere if you are just willing to look.';

const annotation = [
  'new', 'Bestseller', null,
];

(async () => {
  try {
    await connectToDb();

    genres.forEach(async (item) => {
      const genre = new Genres();
      genre.name = item;
      await db.genres.save(genre);
    });

    for (let i = 0; i < 4; i++) {
      const book = new Book();
      book.name = name[Math.floor(Math.random() * name.length)];
      book.author = author[Math.floor(Math.random() * author.length)];
      book.price = price[Math.floor(Math.random() * price.length)];
      book.raiting = raiting[Math.floor(Math.random() * raiting.length)];
      book.isAvailable = !!(i % 10);
      book.coverType = coverType[Math.floor(Math.random() * coverType.length)];
      book.bestSeller = !!(i % 10);
      book.description = description;
      book.image = bookCovers[Math.floor(Math.random() * bookCovers.length)];
      // book.annotation = annotation[Math.floor(Math.random() * annotation.length)];
      book.dateOfIssue = dateIssue[Math.floor(Math.random() * dateIssue.length)];
      const genresArray: Genres[] = [];

      for (let i = 0; i < Math.floor(1 + Math.random() * 3); i++) {
        const index = Math.floor(Math.random() * genres.length);
        const genre = genres[index];
        // eslint-disable-next-line no-await-in-loop
        const currentGenre = await db.genres.findOne({ where: { name: genre } });
        if (currentGenre) {
          // const { name, genreId } = currentGenre;
          // genresArray.push({ name, genreId });
          // eslint-disable-next-line no-console
          console.log(currentGenre);
          genresArray.push(currentGenre);
        }
      }

      for (let i = 0; i < genresArray.length; i++) {
        for (let j = i + 1; j < genresArray.length; j++) {
          if (genresArray[i].name !== genresArray[j].name) {
            continue;
          }
          genresArray.splice(j, 1);
        }
      }
      book.genres = genresArray;
      // eslint-disable-next-line no-await-in-loop
      await db.books.save(book);
    }

    process.exit(0);
  } catch (error) {
    console.error(error);
  }
})();
