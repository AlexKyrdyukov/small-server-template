import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1674551619073 implements MigrationInterface {
    name = 'sync1674551619073'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book" ALTER COLUMN "rating" RENAME TO "rating123123waqse";
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book" ALTER COLUMN "rating123123waqse" RENAME TO "rating";
        `);
    }

}
