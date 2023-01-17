import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1673978156118 implements MigrationInterface {
    name = 'sync1673978156118'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "dateOfIssue" date NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "price"
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "price" money NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "price"
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "price" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "dateOfIssue"
        `);
    }

}
