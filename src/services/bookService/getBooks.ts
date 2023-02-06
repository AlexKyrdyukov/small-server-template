import { Between } from 'typeorm';
import db from '../../db';
import config from '../../config';

type FiltrersType = {
  sortDirection: 'ASC' | 'DESC';
  sortBy: string;
  perPage: number;
  page: number;
  search: string;
  genres: string[];
  minPrice: string;
  maxPrice: string;
};

const getFiltered = async (params: FiltrersType) => {
  // eslint-disable-next-line no-console
  console.log(params.page,
    +params.maxPrice,
    +params.maxPrice * 10, (
      (+params.maxPrice * 10) || 222000));
  const books = await db.books
    .createQueryBuilder('books')
    .orderBy(`books.${params.sortBy || 'priceInCent'}`, `${params.sortDirection}`)
    // .andWhere(
    //   'books.priceInCent = :priceInCent', Between((+params.minPrice || 0), ((+params.maxPrice * 10) || 222000)),
    // )
    .skip((params.perPage || +config.dataSettings.countBook) * (+params.page - 1))
    .take(params.perPage || +config.dataSettings.countBook)
    .getManyAndCount();

  console.log(books[1]);
  return books;
};

export default getFiltered;
