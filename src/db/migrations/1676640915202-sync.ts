import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1676640915202 implements MigrationInterface {
    name = 'sync1676640915202'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "cart_products" DROP CONSTRAINT "FK_f05332fc81d4f97e75f8314ac05"
        `);
        await queryRunner.query(`
            CREATE TABLE "user_favorite_books_book" (
                "userUserId" integer NOT NULL,
                "bookBookId" integer NOT NULL,
                CONSTRAINT "PK_af73e110dc1c5c113bbd3087858" PRIMARY KEY ("userUserId", "bookBookId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_e2ecb93033d992c6ad5bb097dd" ON "user_favorite_books_book" ("userUserId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_dea898c474475de80a15bc36db" ON "user_favorite_books_book" ("bookBookId")
        `);
        await queryRunner.query(`
            CREATE TABLE "user_cart_products_cart_products" (
                "userUserId" integer NOT NULL,
                "cartProductsCartProductId" integer NOT NULL,
                CONSTRAINT "PK_f950fcbe163f625d4815be59888" PRIMARY KEY ("userUserId", "cartProductsCartProductId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_600fd20d434ce0351bfdd9e92e" ON "user_cart_products_cart_products" ("userUserId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_d87836861af1f6cdcd5c80b41d" ON "user_cart_products_cart_products" ("cartProductsCartProductId")
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_products" DROP COLUMN "usersUserId"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_favorite_books_book"
            ADD CONSTRAINT "FK_e2ecb93033d992c6ad5bb097ddd" FOREIGN KEY ("userUserId") REFERENCES "user"("userId") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "user_favorite_books_book"
            ADD CONSTRAINT "FK_dea898c474475de80a15bc36db6" FOREIGN KEY ("bookBookId") REFERENCES "book"("bookId") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "user_cart_products_cart_products"
            ADD CONSTRAINT "FK_600fd20d434ce0351bfdd9e92e3" FOREIGN KEY ("userUserId") REFERENCES "user"("userId") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "user_cart_products_cart_products"
            ADD CONSTRAINT "FK_d87836861af1f6cdcd5c80b41d8" FOREIGN KEY ("cartProductsCartProductId") REFERENCES "cart_products"("cartProductId") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user_cart_products_cart_products" DROP CONSTRAINT "FK_d87836861af1f6cdcd5c80b41d8"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_cart_products_cart_products" DROP CONSTRAINT "FK_600fd20d434ce0351bfdd9e92e3"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_favorite_books_book" DROP CONSTRAINT "FK_dea898c474475de80a15bc36db6"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_favorite_books_book" DROP CONSTRAINT "FK_e2ecb93033d992c6ad5bb097ddd"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_products"
            ADD "usersUserId" integer
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_d87836861af1f6cdcd5c80b41d"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_600fd20d434ce0351bfdd9e92e"
        `);
        await queryRunner.query(`
            DROP TABLE "user_cart_products_cart_products"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_dea898c474475de80a15bc36db"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_e2ecb93033d992c6ad5bb097dd"
        `);
        await queryRunner.query(`
            DROP TABLE "user_favorite_books_book"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_products"
            ADD CONSTRAINT "FK_f05332fc81d4f97e75f8314ac05" FOREIGN KEY ("usersUserId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
