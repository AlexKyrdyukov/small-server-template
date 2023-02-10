import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1676038920230 implements MigrationInterface {
    name = 'sync1676038920230'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "userLikesUserId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD CONSTRAINT "FK_281ebde62cd9f307a9934c87ded" FOREIGN KEY ("userLikesUserId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book" DROP CONSTRAINT "FK_281ebde62cd9f307a9934c87ded"
        `);
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "userLikesUserId"
        `);
    }

}
