import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1676281070560 implements MigrationInterface {
    name = 'sync1676281070560'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book" DROP CONSTRAINT "FK_281ebde62cd9f307a9934c87ded"
        `);
        await queryRunner.query(`
            CREATE TABLE "user_like_books_book" (
                "userUserId" integer NOT NULL,
                "bookBookId" integer NOT NULL,
                CONSTRAINT "PK_c25687364975a55dfd8a9064c7c" PRIMARY KEY ("userUserId", "bookBookId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_9d34fa27e5c1197d5a9b3699dc" ON "user_like_books_book" ("userUserId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_1d7d8411534d06d7338607c095" ON "user_like_books_book" ("bookBookId")
        `);
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "userLikesUserId"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_like_books_book"
            ADD CONSTRAINT "FK_9d34fa27e5c1197d5a9b3699dcb" FOREIGN KEY ("userUserId") REFERENCES "user"("userId") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "user_like_books_book"
            ADD CONSTRAINT "FK_1d7d8411534d06d7338607c095b" FOREIGN KEY ("bookBookId") REFERENCES "book"("bookId") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user_like_books_book" DROP CONSTRAINT "FK_1d7d8411534d06d7338607c095b"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_like_books_book" DROP CONSTRAINT "FK_9d34fa27e5c1197d5a9b3699dcb"
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "userLikesUserId" integer
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_1d7d8411534d06d7338607c095"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_9d34fa27e5c1197d5a9b3699dc"
        `);
        await queryRunner.query(`
            DROP TABLE "user_like_books_book"
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD CONSTRAINT "FK_281ebde62cd9f307a9934c87ded" FOREIGN KEY ("userLikesUserId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
