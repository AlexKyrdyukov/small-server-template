import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1676071701069 implements MigrationInterface {
    name = 'sync1676071701069'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "raiting"
            RENAME COLUMN "raiting" TO "raitingraiting"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "raiting" DROP COLUMN "raitingraiting"
        `);
    }

}
