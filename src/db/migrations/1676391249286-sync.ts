import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1676391249286 implements MigrationInterface {
    name = 'sync1676391249286'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "comment"
            ADD "createdDate" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "comment"
            ADD "updatedDate" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "comment"
            ADD "deletedDate" TIMESTAMP
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "comment" DROP COLUMN "deletedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "comment" DROP COLUMN "updatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "comment" DROP COLUMN "createdDate"
        `);
    }

}
