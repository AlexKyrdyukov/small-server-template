import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1676018828276 implements MigrationInterface {
    name = 'sync1676018828276'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "raiting" DROP CONSTRAINT "FK_88aea7f4acd433c9e9ed2875027"
        `);
        await queryRunner.query(`
            ALTER TABLE "raiting" DROP COLUMN "usersUserId"
        `);
        await queryRunner.query(`
            ALTER TABLE "raiting"
            ADD "raitingValue" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "raiting"
            ADD "userIdUserId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "raiting"
            ADD CONSTRAINT "FK_0b063e6c398122817ee14317fc6" FOREIGN KEY ("userIdUserId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "raiting" DROP CONSTRAINT "FK_0b063e6c398122817ee14317fc6"
        `);
        await queryRunner.query(`
            ALTER TABLE "raiting" DROP COLUMN "userIdUserId"
        `);
        await queryRunner.query(`
            ALTER TABLE "raiting" DROP COLUMN "raitingValue"
        `);
        await queryRunner.query(`
            ALTER TABLE "raiting"
            ADD "usersUserId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "raiting"
            ADD CONSTRAINT "FK_88aea7f4acd433c9e9ed2875027" FOREIGN KEY ("usersUserId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
