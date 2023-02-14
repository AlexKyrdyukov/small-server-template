import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1676394385566 implements MigrationInterface {
    name = 'sync1676394385566'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "comment" DROP CONSTRAINT "FK_89b46e0e88b8d6a92e4a9ea825d"
        `);
        await queryRunner.query(`
            ALTER TABLE "comment"
                RENAME COLUMN "userCommentsUserId" TO "userUserId"
        `);
        await queryRunner.query(`
            ALTER TABLE "comment"
            ADD CONSTRAINT "FK_1a0a9c69d17cfb196d090858bc8" FOREIGN KEY ("userUserId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "comment" DROP CONSTRAINT "FK_1a0a9c69d17cfb196d090858bc8"
        `);
        await queryRunner.query(`
            ALTER TABLE "comment"
                RENAME COLUMN "userUserId" TO "userCommentsUserId"
        `);
        await queryRunner.query(`
            ALTER TABLE "comment"
            ADD CONSTRAINT "FK_89b46e0e88b8d6a92e4a9ea825d" FOREIGN KEY ("userCommentsUserId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
