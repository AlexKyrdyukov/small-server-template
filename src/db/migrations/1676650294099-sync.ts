import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1676650294099 implements MigrationInterface {
    name = 'sync1676650294099'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book" DROP CONSTRAINT "FK_23332fce19c90cf150b5839c9a9"
        `);
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "productCartCartProductId"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_products"
            ADD "bookBookId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_products"
            ADD CONSTRAINT "FK_a1479cb4a32fab53ed4ff2b420b" FOREIGN KEY ("bookBookId") REFERENCES "book"("bookId") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "cart_products" DROP CONSTRAINT "FK_a1479cb4a32fab53ed4ff2b420b"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_products" DROP COLUMN "bookBookId"
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "productCartCartProductId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD CONSTRAINT "FK_23332fce19c90cf150b5839c9a9" FOREIGN KEY ("productCartCartProductId") REFERENCES "cart_products"("cartProductId") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
