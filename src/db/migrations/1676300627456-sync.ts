import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1676300627456 implements MigrationInterface {
    name = 'sync1676300627456'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "cart_products_cart_book" (
                "cartProductsCartProductId" integer NOT NULL,
                "bookBookId" integer NOT NULL,
                CONSTRAINT "PK_6a5363ae9c5cd77518af05890f4" PRIMARY KEY ("cartProductsCartProductId", "bookBookId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_3d5cbfa9835babedfa191b6ab6" ON "cart_products_cart_book" ("cartProductsCartProductId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_237ae40e1f288e6d8103a38299" ON "cart_products_cart_book" ("bookBookId")
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_products"
            RENAME COLUMN "bookIdentificator" TO "bookId"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_products_cart_book"
            ADD CONSTRAINT "FK_3d5cbfa9835babedfa191b6ab66" FOREIGN KEY ("cartProductsCartProductId") REFERENCES "cart_products"("cartProductId") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_products_cart_book"
            ADD CONSTRAINT "FK_237ae40e1f288e6d8103a382996" FOREIGN KEY ("bookBookId") REFERENCES "book"("bookId") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "cart_products_cart_book" DROP CONSTRAINT "FK_237ae40e1f288e6d8103a382996"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_products_cart_book" DROP CONSTRAINT "FK_3d5cbfa9835babedfa191b6ab66"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_products" RENAME COLUMN "bookId" TO "bookIdentificator"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_237ae40e1f288e6d8103a38299"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_3d5cbfa9835babedfa191b6ab6"
        `);
        await queryRunner.query(`
            DROP TABLE "cart_products_cart_book"
        `);
    }

}
