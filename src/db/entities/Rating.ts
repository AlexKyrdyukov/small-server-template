import * as typeorm from 'typeorm';

import { BooksEntity, UsersEntity } from '../../db';

@typeorm.Entity()
class Rating {
  @typeorm.PrimaryGeneratedColumn()
  ratingId: number;

  @typeorm.CreateDateColumn({ select: false })
  createdDate: Date;

  @typeorm.UpdateDateColumn({ select: false })
  updatedDate: Date;

  @typeorm.DeleteDateColumn({ select: false })
  deletedDate: Date;

  @typeorm.Column({ unique: false, nullable: false, type: 'integer' })
  rating: number;

  @typeorm.ManyToOne(() => BooksEntity, (book) => book.ratingIds)
  book: BooksEntity;

  @typeorm.ManyToOne(() => UsersEntity, (user) => user.usersRatings)
  user: UsersEntity;
}

export default Rating;
