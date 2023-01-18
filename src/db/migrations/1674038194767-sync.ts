import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1674038194767 implements MigrationInterface {
    name = 'sync1674038194767'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "test" character varying
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "test"
        `);
    }

}
