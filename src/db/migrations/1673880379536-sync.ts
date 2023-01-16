import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1673880379536 implements MigrationInterface {
    name = 'sync1673880379536'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "books" DROP COLUMN "raiting"
        `);
        await queryRunner.query(`
            ALTER TABLE "books"
            ADD "raiting" integer
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "books" DROP COLUMN "raiting"
        `);
        await queryRunner.query(`
            ALTER TABLE "books"
            ADD "raiting" double precision
        `);
    }

}
