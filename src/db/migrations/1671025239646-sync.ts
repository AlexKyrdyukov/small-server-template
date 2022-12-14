import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1671025239646 implements MigrationInterface {
    name = 'sync1671025239646'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "fullName" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "dob" DROP NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "dob"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "fullName"
            SET NOT NULL
        `);
    }

}
