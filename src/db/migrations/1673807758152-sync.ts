import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1673807758152 implements MigrationInterface {
    name = 'sync1673807758152'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "books" DROP CONSTRAINT "UQ_85c55aed18830b723dd8216b1e7"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "books"
            ADD CONSTRAINT "UQ_85c55aed18830b723dd8216b1e7" UNIQUE ("image")
        `);
    }

}
