import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1676298214408 implements MigrationInterface {
    name = 'sync1676298214408'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "cart_products"
                RENAME COLUMN "bookId" TO "bookIdentificator"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "cart_products"
                RENAME COLUMN "bookIdentificator" TO "bookId"
        `);
    }

}
