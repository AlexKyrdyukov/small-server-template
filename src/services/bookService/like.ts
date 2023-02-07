import db from '../../db';

const like = async (bookId: number, userId: number) => {
  const query = await db.user
    .createQueryBuilder('user')
    .where('user.userId = :userId', { userId })
    .leftJoinAndSelect('user.likeBooks', 'likes')
    .andWhere('likes.bookId = :bookId', { bookId })
    .getOne();
  console.log(query);
};

export default like;
