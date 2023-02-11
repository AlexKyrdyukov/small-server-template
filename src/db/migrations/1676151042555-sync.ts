import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1676151042555 implements MigrationInterface {
    name = 'sync1676151042555'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "rating" (
                "ratingId" SERIAL NOT NULL,
                "createdDate" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedDate" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedDate" TIMESTAMP,
                "rating" integer NOT NULL,
                "bookBookId" integer,
                "userUserId" integer,
                CONSTRAINT "PK_d32cecfa3fc35a981b31c55f739" PRIMARY KEY ("ratingId")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "comment" (
                "commentId" SERIAL NOT NULL,
                "commentText" character varying NOT NULL,
                CONSTRAINT "PK_1b03586f7af11eac99f4fdbf012" PRIMARY KEY ("commentId")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "book" RENAME COLUMN "raiting" TO "averageRating"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart" DROP COLUMN "userId"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "cartIdCartId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "UQ_2da1775a2a8d77cc187fa890030" UNIQUE ("cartIdCartId")
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "commentCommentId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "bookInCartCartId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "commentCommentId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "FK_2da1775a2a8d77cc187fa890030" FOREIGN KEY ("cartIdCartId") REFERENCES "cart"("cartId") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "FK_15cdf6a99e7a97fa9cb9035dffc" FOREIGN KEY ("commentCommentId") REFERENCES "comment"("commentId") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD CONSTRAINT "FK_8e08ded753c26dad89ca38c8d27" FOREIGN KEY ("bookInCartCartId") REFERENCES "cart"("cartId") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD CONSTRAINT "FK_f99f2b91226728711f05c09d686" FOREIGN KEY ("commentCommentId") REFERENCES "comment"("commentId") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "rating"
            ADD CONSTRAINT "FK_88ad6f261d3853cc7f299e740e6" FOREIGN KEY ("bookBookId") REFERENCES "book"("bookId") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "rating"
            ADD CONSTRAINT "FK_a495626250a1857eb11bcd94213" FOREIGN KEY ("userUserId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "rating" DROP CONSTRAINT "FK_a495626250a1857eb11bcd94213"
        `);
        await queryRunner.query(`
            ALTER TABLE "rating" DROP CONSTRAINT "FK_88ad6f261d3853cc7f299e740e6"
        `);
        await queryRunner.query(`
            ALTER TABLE "book" DROP CONSTRAINT "FK_f99f2b91226728711f05c09d686"
        `);
        await queryRunner.query(`
            ALTER TABLE "book" DROP CONSTRAINT "FK_8e08ded753c26dad89ca38c8d27"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "FK_15cdf6a99e7a97fa9cb9035dffc"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "FK_2da1775a2a8d77cc187fa890030"
        `);
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "commentCommentId"
        `);
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "bookInCartCartId"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "commentCommentId"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "UQ_2da1775a2a8d77cc187fa890030"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "cartIdCartId"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart"
            ADD "userId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "raiting" integer NOT NULL
        `);
        await queryRunner.query(`
            DROP TABLE "comment"
        `);
        await queryRunner.query(`
            DROP TABLE "rating"
        `);
    }

}
