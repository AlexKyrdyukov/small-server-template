import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1676286913699 implements MigrationInterface {
    name = 'sync1676286913699'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "cart_products" DROP CONSTRAINT "UQ_3388decc0c68bca5f8038efca37"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "cart_products"
            ADD CONSTRAINT "UQ_3388decc0c68bca5f8038efca37" UNIQUE ("bookId")
        `);
    }

}
