import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1676565119471 implements MigrationInterface {
    name = 'sync1676565119471'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "FK_a4ba4280d134a4f1117dfc3e9b7"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_products" DROP CONSTRAINT "FK_a1479cb4a32fab53ed4ff2b420b"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_products" DROP CONSTRAINT "FK_ed14c8ba469ba03b96ae4f197cd"
        `);
        await queryRunner.query(`
            CREATE TABLE "cart_products_book_book" (
                "cartProductsCartProductId" integer NOT NULL,
                "bookBookId" integer NOT NULL,
                CONSTRAINT "PK_758c998a251396ea5534bb31174" PRIMARY KEY ("cartProductsCartProductId", "bookBookId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_d9fdebc320511c6aa659d2aaa6" ON "cart_products_book_book" ("cartProductsCartProductId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_ed1ef3e1a23b4ab1d8894919cf" ON "cart_products_book_book" ("bookBookId")
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "UQ_a4ba4280d134a4f1117dfc3e9b7"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "cartCartId"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_products" DROP COLUMN "userCartCartId"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_products" DROP COLUMN "bookBookId"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_products"
            ADD "usersUserId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_products"
            ADD CONSTRAINT "FK_f05332fc81d4f97e75f8314ac05" FOREIGN KEY ("usersUserId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_products_book_book"
            ADD CONSTRAINT "FK_d9fdebc320511c6aa659d2aaa67" FOREIGN KEY ("cartProductsCartProductId") REFERENCES "cart_products"("cartProductId") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_products_book_book"
            ADD CONSTRAINT "FK_ed1ef3e1a23b4ab1d8894919cf0" FOREIGN KEY ("bookBookId") REFERENCES "book"("bookId") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "cart_products_book_book" DROP CONSTRAINT "FK_ed1ef3e1a23b4ab1d8894919cf0"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_products_book_book" DROP CONSTRAINT "FK_d9fdebc320511c6aa659d2aaa67"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_products" DROP CONSTRAINT "FK_f05332fc81d4f97e75f8314ac05"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_products" DROP COLUMN "usersUserId"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_products"
            ADD "bookBookId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_products"
            ADD "userCartCartId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "cartCartId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "UQ_a4ba4280d134a4f1117dfc3e9b7" UNIQUE ("cartCartId")
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_ed1ef3e1a23b4ab1d8894919cf"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_d9fdebc320511c6aa659d2aaa6"
        `);
        await queryRunner.query(`
            DROP TABLE "cart_products_book_book"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_products"
            ADD CONSTRAINT "FK_ed14c8ba469ba03b96ae4f197cd" FOREIGN KEY ("userCartCartId") REFERENCES "cart"("cartId") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_products"
            ADD CONSTRAINT "FK_a1479cb4a32fab53ed4ff2b420b" FOREIGN KEY ("bookBookId") REFERENCES "book"("bookId") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "FK_a4ba4280d134a4f1117dfc3e9b7" FOREIGN KEY ("cartCartId") REFERENCES "cart"("cartId") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
