import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1675884328355 implements MigrationInterface {
    name = 'sync1675884328355'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user_like_books_book" DROP CONSTRAINT "FK_1d7d8411534d06d7338607c095b"
        `);
        await queryRunner.query(`
            ALTER TABLE "raiting" DROP COLUMN "userId"
        `);
        await queryRunner.query(`
            ALTER TABLE "raiting"
            ADD "bookIdBookId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "raiting"
            ADD "usersUserId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "raiting"
            ADD CONSTRAINT "FK_33af7b7138c61eddd215159fe44" FOREIGN KEY ("bookIdBookId") REFERENCES "book"("bookId") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "raiting"
            ADD CONSTRAINT "FK_88aea7f4acd433c9e9ed2875027" FOREIGN KEY ("usersUserId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION
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
            ALTER TABLE "raiting" DROP CONSTRAINT "FK_88aea7f4acd433c9e9ed2875027"
        `);
        await queryRunner.query(`
            ALTER TABLE "raiting" DROP CONSTRAINT "FK_33af7b7138c61eddd215159fe44"
        `);
        await queryRunner.query(`
            ALTER TABLE "raiting" DROP COLUMN "usersUserId"
        `);
        await queryRunner.query(`
            ALTER TABLE "raiting" DROP COLUMN "bookIdBookId"
        `);
        await queryRunner.query(`
            ALTER TABLE "raiting"
            ADD "userId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user_like_books_book"
            ADD CONSTRAINT "FK_1d7d8411534d06d7338607c095b" FOREIGN KEY ("bookBookId") REFERENCES "book"("bookId") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

}
