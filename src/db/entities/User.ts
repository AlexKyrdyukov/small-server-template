import * as typeorm from 'typeorm';
import { BooksEntity, CartProductsEntity, CommentsEntity, RatingsEntity } from '../../db';

import { fileHelpers } from '../../utils';

@typeorm.Entity()
class User {
  @typeorm.PrimaryGeneratedColumn()
  userId: number;

  @typeorm.CreateDateColumn({ select: false })
  createdDate: Date;

  @typeorm.UpdateDateColumn({ select: false })
  updatedDate: Date;

  @typeorm.DeleteDateColumn({ select: false })
  deletedDate: Date;

  @typeorm.Column({ unique: false, nullable: false, type: 'varchar', select: false })
  password: string;

  @typeorm.Column({ unique: false, nullable: true, type: 'varchar' })
  fullName: string;

  @typeorm.Column({ unique: true, nullable: false, type: 'varchar' })
  email: string;

  @typeorm.Column({ unique: false, nullable: true, type: 'varchar' })
  avatar?: string;

  @typeorm.ManyToMany(() => BooksEntity, (book) => book.userLikes)
  @typeorm.JoinTable()
  favoriteBooks: BooksEntity[];

  @typeorm.OneToMany(() => CartProductsEntity, (products) => products.users)
  cartProducts: CartProductsEntity[];

  @typeorm.OneToMany(() => RatingsEntity, (rating) => rating.user)
  usersRatings: RatingsEntity[];

  @typeorm.OneToMany(() => CommentsEntity, (comment) => comment.user)
  comments: CommentsEntity[];

  @typeorm.AfterLoad()
  changeData() {
    this.avatar = this.avatar ? fileHelpers.getUrlImage(this.avatar, 'userAvatars') : this.avatar;
  }
}

export default User;
