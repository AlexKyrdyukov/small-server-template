import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1676297325712 implements MigrationInterface {
    name = 'sync1676297325712'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book" DROP CONSTRAINT "FK_23332fce19c90cf150b5839c9a9"
        `);
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "productCartCartProductId"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
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
