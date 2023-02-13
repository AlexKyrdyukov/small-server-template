import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1676301481194 implements MigrationInterface {
    name = 'sync1676301481194'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`
        //     CREATE TABLE "cart_products_book_book" (
        //         "cartProductsCartProductId" integer NOT NULL,
        //         "bookBookId" integer NOT NULL,
        //         CONSTRAINT "PK_758c998a251396ea5534bb31174" PRIMARY KEY ("cartProductsCartProductId", "bookBookId")
        //     )
        // `);
        // await queryRunner.query(`
        //     CREATE INDEX "IDX_d9fdebc320511c6aa659d2aaa6" ON "cart_products_book_book" ("cartProductsCartProductId")
        // `);
        // await queryRunner.query(`
        //     CREATE INDEX "IDX_ed1ef3e1a23b4ab1d8894919cf" ON "cart_products_book_book" ("bookBookId")
        // `);
        // await queryRunner.query(`
        //     ALTER TABLE "cart_products_book_book"
        //     ADD CONSTRAINT "FK_d9fdebc320511c6aa659d2aaa67" FOREIGN KEY ("cartProductsCartProductId") REFERENCES "cart_products"("cartProductId") ON DELETE CASCADE ON UPDATE CASCADE
        // `);
        // await queryRunner.query(`
        //     ALTER TABLE "cart_products_book_book"
        //     ADD CONSTRAINT "FK_ed1ef3e1a23b4ab1d8894919cf0" FOREIGN KEY ("bookBookId") REFERENCES "book"("bookId") ON DELETE NO ACTION ON UPDATE NO ACTION
        // `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "cart_products_book_book" DROP CONSTRAINT "FK_ed1ef3e1a23b4ab1d8894919cf0"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_products_book_book" DROP CONSTRAINT "FK_d9fdebc320511c6aa659d2aaa67"
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
    }

}
