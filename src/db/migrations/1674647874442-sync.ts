import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1674647874442 implements MigrationInterface {
    name = 'sync1674647874442'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book"
                RENAME COLUMN "raiting" TO "raitingBook"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book"
                RENAME COLUMN "raitingBook" TO "raiting"
        `);
    }

}
