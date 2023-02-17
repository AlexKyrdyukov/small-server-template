import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1676645003595 implements MigrationInterface {
    name = 'sync1676645003595'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "cart_products"
            ADD "usersUserId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "productCartCartProductId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_products"
            ADD CONSTRAINT "FK_f05332fc81d4f97e75f8314ac05" FOREIGN KEY ("usersUserId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD CONSTRAINT "FK_23332fce19c90cf150b5839c9a9" FOREIGN KEY ("productCartCartProductId") REFERENCES "cart_products"("cartProductId") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book" DROP CONSTRAINT "FK_23332fce19c90cf150b5839c9a9"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_products" DROP CONSTRAINT "FK_f05332fc81d4f97e75f8314ac05"
        `);
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "productCartCartProductId"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_products" DROP COLUMN "usersUserId"
        `);
    }

}
