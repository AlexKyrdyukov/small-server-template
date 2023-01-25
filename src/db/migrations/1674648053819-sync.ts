import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1674648053819 implements MigrationInterface {
    name = 'sync1674648053819'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book"
                RENAME COLUMN "raitingBook" TO "raiting"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book"
                RENAME COLUMN "raiting" TO "raitingBook"
        `);
    }

}
