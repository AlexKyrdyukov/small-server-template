import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1673951477768 implements MigrationInterface {
    name = 'sync1673951477768'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "isAvailable" boolean NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "isAvailable"
        `);
    }

}
