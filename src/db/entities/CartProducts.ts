import * as typeorm from 'typeorm';
import { BooksEntity, CartsEntity } from '..';

@typeorm.Entity()
class CartProducts {
  @typeorm.PrimaryGeneratedColumn()
  cartProductId: number;

  @typeorm.CreateDateColumn({ select: false })
  createdDate: Date;

  @typeorm.UpdateDateColumn({ select: false })
  updatedDate: Date;

  @typeorm.DeleteDateColumn({ select: false })
  deletedDate: Date;

  @typeorm.Column({ unique: false, nullable: false, type: 'integer' })
  countBook: number;

  @typeorm.Column({ unique: true, nullable: false, type: 'integer' })
  bookId: number;

  @typeorm.ManyToOne(() => CartsEntity, (cart) => cart.selectedProducts)
  userCart: CartsEntity;

  @typeorm.OneToOne(() => BooksEntity, (book) => book.productCart)
  @typeorm.JoinColumn()
  book: BooksEntity;
}

export default CartProducts;
