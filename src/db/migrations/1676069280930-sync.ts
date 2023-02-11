import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1676069280930 implements MigrationInterface {
    name = 'sync1676069280930'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "userIdUserId" integer
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "userIdUserId"
        `);
    }

}
