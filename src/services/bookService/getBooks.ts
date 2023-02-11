import db from '../../db';

type ParamsType = {
  sortDirection: 'ASC' | 'DESC';
  sortBy: string;
  perPage: string;
  page: string;
  search: string;
  genres: string;
  minPrice: string;
  maxPrice: string;
};

const getFiltered = async (params: ParamsType) => {
  const take = +params.perPage || 12;
  const skip = take * ((+params.page || 1) - 1);
  const minPrice = (Number(params.minPrice) * 100) || 0;
  const maxPrice = (Number(params.maxPrice) * 100) || 200000;
  const sortBy = params.sortBy || 'priceInCent';
  const sortDirection = params.sortDirection || 'ASC';
  const search = params.search;

  const query = db.books
    .createQueryBuilder('book')
    .skip(skip)
    .take(take)
    .orderBy(`book.${sortBy}`, sortDirection)
    .leftJoinAndSelect('book.genres', 'genre')
    .andWhere('book.priceInCent BETWEEN :minPrice AND :maxPrice', { minPrice, maxPrice });

  if (params.search) {
    query.andWhere('(book.description ILIKE :search OR book.name ILIKE :search)', { search: `%${search}%` });
  }

  if (params.genres) {
    const genresIds = params.genres.split(',').map((i) => +i);
    query.andWhere('genre.genreId IN (:...genresIds)', { genresIds });
  }

  const [books, totalBooks] = await query.getManyAndCount();

  return {
    books,
    totalBooks,
    numberOfPage: (+params.page || 1),
  };
};

export default getFiltered;
