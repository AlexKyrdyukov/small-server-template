import db from '../../db';

const getAll = async (userId: number) => {
  const query = await db.cartProducts.find({
    relations: {
      users: true,
    },
    where: {
      users: {
        userId,
      },
    },
    order: {
      createdDate: 'ASC',
    },
  });
  return query;
};

export default getAll;
