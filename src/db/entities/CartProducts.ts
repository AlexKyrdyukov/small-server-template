import * as typeorm from 'typeorm';
import { BooksEntity, CartsEntity } from '..';

@typeorm.Entity()
class CartProducts {
  @typeorm.PrimaryGeneratedColumn()
  cartProductId: number;

  @typeorm.CreateDateColumn()
  createdDate: Date;

  @typeorm.UpdateDateColumn()
  updatedDate: Date;

  @typeorm.DeleteDateColumn()
  deletedDate: Date;

  @typeorm.Column({ nullable: false, type: 'integer' })
  countBook: number;

  @typeorm.Column({ nullable: false, type: 'integer' })
  bookId: number;

  @typeorm.ManyToOne(() => CartsEntity, (cart) => cart.selectedProducts)
  userCart: CartsEntity;

  @typeorm.ManyToOne(() => BooksEntity, (book) => book.productCart)
  @typeorm.JoinTable()
  book: BooksEntity;
}

export default CartProducts;
