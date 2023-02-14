import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1676376163611 implements MigrationInterface {
    name = 'sync1676376163611'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "FK_15cdf6a99e7a97fa9cb9035dffc"
        `);
        await queryRunner.query(`
            ALTER TABLE "book" DROP CONSTRAINT "FK_f99f2b91226728711f05c09d686"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "commentCommentId"
        `);
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "commentCommentId"
        `);
        await queryRunner.query(`
            ALTER TABLE "comment"
            ADD "userCommentsUserId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "comment"
            ADD "bookBookId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "comment"
            ADD CONSTRAINT "FK_89b46e0e88b8d6a92e4a9ea825d" FOREIGN KEY ("userCommentsUserId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "comment"
            ADD CONSTRAINT "FK_35cdbaf743c6172ec19a0d1f766" FOREIGN KEY ("bookBookId") REFERENCES "book"("bookId") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "comment" DROP CONSTRAINT "FK_35cdbaf743c6172ec19a0d1f766"
        `);
        await queryRunner.query(`
            ALTER TABLE "comment" DROP CONSTRAINT "FK_89b46e0e88b8d6a92e4a9ea825d"
        `);
        await queryRunner.query(`
            ALTER TABLE "comment" DROP COLUMN "bookBookId"
        `);
        await queryRunner.query(`
            ALTER TABLE "comment" DROP COLUMN "userCommentsUserId"
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "commentCommentId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "commentCommentId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD CONSTRAINT "FK_f99f2b91226728711f05c09d686" FOREIGN KEY ("commentCommentId") REFERENCES "comment"("commentId") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "FK_15cdf6a99e7a97fa9cb9035dffc" FOREIGN KEY ("commentCommentId") REFERENCES "comment"("commentId") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
