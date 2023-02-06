import { Between } from 'typeorm';
import db from '../../db';
import config from '../../config';

type FiltrersType = {
  sortDirection: 'ASC' | 'DESC';
  sortBy: string;
  perPage: number;
  page: number;
  search: string;
  genres: string;
  minPrice: string;
  maxPrice: string;
};

const getFiltered = async (params: FiltrersType) => {
  // eslint-disable-next-line no-console
  console.log(params.genres);
  const books = await db.books
    .createQueryBuilder('books')
    .leftJoinAndSelect('books.genres', 'genres', 'genres.genreId = :genreId', { genreId: params.genres })
    .orderBy(`books.${params.sortBy || 'priceInCent'}`, `${params.sortDirection}`)
    // .where(
    // 'books.priceInCent = :priceInCent',
    // Between((+params.minPrice || 0), ((+params.maxPrice * 10) || 222000)),
    // )
    .skip((params.perPage || +config.dataSettings.countBook) * (+params.page - 1))
    .take(params.perPage || +config.dataSettings.countBook)
    .getManyAndCount();

  console.log(books[1]);
  return books;
};

export default getFiltered;
