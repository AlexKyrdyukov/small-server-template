import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1674038228761 implements MigrationInterface {
    name = 'sync1674038228761'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "test"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "test" character varying
        `);
    }

}
