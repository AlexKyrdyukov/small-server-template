import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1671791265401 implements MigrationInterface {
    name = 'sync1671791265401'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
                RENAME COLUMN "dob" TO "avatar"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "avatar"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "avatar" character varying
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "avatar"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "avatar" date
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
                RENAME COLUMN "avatar" TO "dob"
        `);
    }

}
