import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1676295093431 implements MigrationInterface {
    name = 'sync1676295093431'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "cart_products"
            ADD "userCartCartId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_products"
            ADD "bookBookId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_products"
            ADD CONSTRAINT "UQ_a1479cb4a32fab53ed4ff2b420b" UNIQUE ("bookBookId")
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_products"
            ADD CONSTRAINT "FK_ed14c8ba469ba03b96ae4f197cd" FOREIGN KEY ("userCartCartId") REFERENCES "cart"("cartId") ON DELETE NO ACTION ON UPDATE NO ACTION
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
            ALTER TABLE "cart_products" DROP CONSTRAINT "FK_ed14c8ba469ba03b96ae4f197cd"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_products" DROP CONSTRAINT "UQ_a1479cb4a32fab53ed4ff2b420b"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_products" DROP COLUMN "bookBookId"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_products" DROP COLUMN "userCartCartId"
        `);
    }

}
