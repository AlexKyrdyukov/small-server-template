import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1676074345812 implements MigrationInterface {
    name = 'sync1676074345812'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "raiting" DROP COLUMN "raitingraiting"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "raiting"
            ADD "raitingraiting" integer NOT NULL
        `);
    }

}
