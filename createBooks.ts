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

const image = ['psychology_of_money.svg',
  'fairy_tails.svg',
  'stop_worring.svg',
  'moby_dick.svg',
  'weight_of_things.svg',
  'milk_and_honey.svg'];

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

    for (let i = 0; i < 40; i++) {
      const book = new Book();
      book.name = name[Math.floor(Math.random() * name.length)];
      book.author = author[Math.floor(Math.random() * author.length)];
      book.image = image[Math.floor(Math.random() * image.length)];
      book.annotation = annotation[Math.floor(Math.random() * annotation.length)];
      book.coverType = coverType[Math.floor(Math.random() * coverType.length)];
      book.price = price[Math.floor(Math.random() * price.length)];
      book.raiting = raiting[Math.floor(Math.random() * raiting.length)];
      book.description = description;
      book.isAvailable = !!(i % 10);
      const genresArray: Genres[] = [];

      for (let i = 0; i < Math.floor(1 + Math.random() * 3); i++) {
        const index = Math.floor(Math.random() * genres.length);
        const genre = genres[index];
        // eslint-disable-next-line no-await-in-loop
        const currentGenre = await db.genres.findOne({ where: { name: genre } });
        if (currentGenre) {
          const { name, id } = currentGenre;
          genresArray.push({ name, id });
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
