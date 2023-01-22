import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1674338619213 implements MigrationInterface {
    name = 'sync1674338619213'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book"
            ALTER COLUMN "bestSeller"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ALTER COLUMN "new"
            SET DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ALTER COLUMN "dateOfIssue" DROP NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book"
            ALTER COLUMN "dateOfIssue"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ALTER COLUMN "new" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ALTER COLUMN "bestSeller" DROP NOT NULL
        `);
    }

}
