import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1676074044491 implements MigrationInterface {
    name = 'sync1676074044491'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "raiting" DROP CONSTRAINT "FK_0b063e6c398122817ee14317fc6"
        `);
        await queryRunner.query(`
            ALTER TABLE "raiting"
                RENAME COLUMN "userIdUserId" TO "userId"
        `);
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "userIdUserId"
        `);
        // await queryRunner.query(`
        //     ALTER TABLE "raiting"
        //     ALTER COLUMN "userId"
        //     SET NOT NULL
        // `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "raiting"
            ALTER COLUMN "userId" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "userIdUserId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "raiting"
                RENAME COLUMN "userId" TO "userIdUserId"
        `);
        await queryRunner.query(`
            ALTER TABLE "raiting"
            ADD CONSTRAINT "FK_0b063e6c398122817ee14317fc6" FOREIGN KEY ("userIdUserId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
