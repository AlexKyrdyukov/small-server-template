import * as typeorm from 'typeorm';

import { CartsEntity, CommentsEnntity, GenresEntity, RatingsEntity, UsersEntity } from '../../db';

import { fileHelpers, dataHelper } from '../../utils';

enum CoverENUM {
  HARD = 'Hardcover',
  SOFT = 'Paperback',
}

@typeorm.Entity()
class Book {
  @typeorm.PrimaryGeneratedColumn()
  bookId: number;

  @typeorm.CreateDateColumn()
  createdDate: Date;

  @typeorm.UpdateDateColumn({ select: false })
  updatedDate: Date;

  @typeorm.DeleteDateColumn({ select: false })
  deletedDate: Date;

  @typeorm.Column({ unique: false, nullable: false, type: 'varchar' })
  name: string;

  @typeorm.Column({ unique: false, nullable: false, type: 'varchar' })
  author: string;

  @typeorm.Column({ unique: false, nullable: true, type: 'integer' })
  priceInCent: number;

  @typeorm.Column({ unique: false, nullable: false, type: 'integer' })
  averageRating: number;

  @typeorm.Column({ unique: false, nullable: false, type: 'boolean' })
  isInStock: boolean;

  @typeorm.Column({ unique: false, nullable: false, type: 'enum', enum: CoverENUM })
  coverType: CoverENUM;

  @typeorm.Column({ unique: false, nullable: false, type: 'boolean' })
  bestSeller: boolean;

  @typeorm.Column({ unique: false, nullable: true, type: 'boolean', default: false })
  new: boolean;

  @typeorm.Column({ unique: false, nullable: false, type: 'varchar' })
  description: string;

  @typeorm.Column({ unique: false, nullable: false, type: 'varchar' })
  image: string;

  @typeorm.Column({ unique: false, nullable: true, type: 'date' })
  dateOfIssue: string;

  @typeorm.ManyToMany(() => GenresEntity, (genre) => genre.books)
  @typeorm.JoinTable()
  genres: GenresEntity[];

  @typeorm.ManyToOne(() => UsersEntity, (user) => user.likeBooks)
  userLikes: UsersEntity;

  @typeorm.OneToMany(() => RatingsEntity, (rating) => rating.book)
  // // @typeorm. // JoinTable()
  ratingIds: RatingsEntity[];

  @typeorm.ManyToOne(() => CartsEntity, (cart) => cart.books)
  bookInCart: CartsEntity;

  @typeorm.ManyToOne(() => CommentsEnntity, (comments) => comments.book)
  comment: CommentsEnntity;

  priceInDollar: string;

  @typeorm.AfterLoad()
  changeLoadData() {
    this.image = fileHelpers.getUrlImage(this.image, 'bookCovers');
    this.new = dataHelper.checkIsNew(this.createdDate);
    this.priceInDollar = dataHelper.convertInString(this.priceInCent);
  }
}

export default Book;
