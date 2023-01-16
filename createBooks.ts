import db from './src/db';
import connectToDb from './src/db/connectToDb';
import Books from './src/db/entities/Books';
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

const name = ['The Psychology of Money',
  'Book of Fairy Tales',
  'How to stop worrying and start living',
  'Moby Dick',
  'The Weight of Things',
  'Milk and honey'];

const price = [1420, 885, 932, 1100, 1300, 3900];

const raiting = [40, 46, 33, 26, 13, 37];

const coverType = ['Hardcover', 'Paperback'];

const image = ['psychology_of_money.svg',
  'fairy_tails.svg',
  'stop_worring.svg',
  'moby_dick.svg',
  'weight_of_things.svg',
  'milk_and_honey.svg'];

const annotation = [
  'new', 'Bestseller', null,
];

(async () => {
  try {
    await connectToDb();

    // genres.forEach(async (item) => {
    //   const genre = new Genres();
    //   genre.name = item;
    //   await db.genres.save(genre);
    // });

    for (let i = 0; i < 3; i++) {
      const book = new Books();
      book.name = name[Math.floor(Math.random() * (name.length + 1))];
      book.author = author[Math.floor(Math.random() * (author.length + 1))];
      book.image = image[Math.floor(Math.random() * (image.length + 1))];
      const arr: Genres[] = [];
      for (let i = 0; i < Math.floor(Math.random() * (3 + 1)); i++) {
        const index = Math.floor(Math.random() * (genres.length));
        const ganre = genres[index];
        // eslint-disable-next-line no-await-in-loop
        const currentGenre = await db.genres.findOne({ where: { name: ganre } });
        if (currentGenre) {
          const { name, id } = currentGenre;
          arr.push({ name, id });
        }
      }
      // eslint-disable-next-line no-console
      // console.log(arr);
      book.genres = arr.filter((item, index) => {
        // eslint-disable-next-line no-console
        console.log(item, item.name, arr.indexOf(item.id));
        return arr.indexOf(item) === index;
      });
      // eslint-disable-next-line no-console
      // console.log(book.genres);
    }
    // books.forEach(async (item) => {
    //   book.author = item.author;
    //   book.name = item.name;
    //   book.coverType = item.coverType;
    //   book.price = item?.price;
    //   book.annotation = item?.annotation;
    //   book.image = item.image;
    //   book.raiting = item.raiting;
    //   book.genres = item.genres;
    //   await db.books.save(book);
    // });
    process.exit(0);
  } catch (error) {
    console.error(error);
  }
})();
