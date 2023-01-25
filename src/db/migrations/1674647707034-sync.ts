import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1674647707034 implements MigrationInterface {
    name = 'sync1674647707034'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book"
                RENAME COLUMN "raiting" TO "raitingBook"
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ALTER COLUMN "coverType" DROP DEFAULT
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book"
            ALTER COLUMN "coverType"
            SET DEFAULT 'Hardcover'
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
                RENAME COLUMN "raitingBook" TO "raiting"
        `);
    }

}
