import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1676023386107 implements MigrationInterface {
    name = 'sync1676023386107'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "raiting_book_id_book" (
                "raitingRaitingId" integer NOT NULL,
                "bookBookId" integer NOT NULL,
                CONSTRAINT "PK_62fed9a8ea0ac3d211dc8a5a51e" PRIMARY KEY ("raitingRaitingId", "bookBookId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_0284ad456e561d2de083721ae3" ON "raiting_book_id_book" ("raitingRaitingId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_7e42bb5455204758b462fdb0b1" ON "raiting_book_id_book" ("bookBookId")
        `);
        await queryRunner.query(`
            CREATE TABLE "raiting_user_id_user" (
                "raitingRaitingId" integer NOT NULL,
                "userUserId" integer NOT NULL,
                CONSTRAINT "PK_b27a125eca238eb2a69bfd6c923" PRIMARY KEY ("raitingRaitingId", "userUserId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_ca224bf7fd08d432d989b571f1" ON "raiting_user_id_user" ("raitingRaitingId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_168ab61c2390c5d6a05d5b7985" ON "raiting_user_id_user" ("userUserId")
        `);
        await queryRunner.query(`
            ALTER TABLE "raiting_book_id_book"
            ADD CONSTRAINT "FK_0284ad456e561d2de083721ae39" FOREIGN KEY ("raitingRaitingId") REFERENCES "raiting"("raitingId") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "raiting_book_id_book"
            ADD CONSTRAINT "FK_7e42bb5455204758b462fdb0b1a" FOREIGN KEY ("bookBookId") REFERENCES "book"("bookId") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "raiting_user_id_user"
            ADD CONSTRAINT "FK_ca224bf7fd08d432d989b571f14" FOREIGN KEY ("raitingRaitingId") REFERENCES "raiting"("raitingId") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "raiting_user_id_user"
            ADD CONSTRAINT "FK_168ab61c2390c5d6a05d5b79859" FOREIGN KEY ("userUserId") REFERENCES "user"("userId") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "raiting_user_id_user" DROP CONSTRAINT "FK_168ab61c2390c5d6a05d5b79859"
        `);
        await queryRunner.query(`
            ALTER TABLE "raiting_user_id_user" DROP CONSTRAINT "FK_ca224bf7fd08d432d989b571f14"
        `);
        await queryRunner.query(`
            ALTER TABLE "raiting_book_id_book" DROP CONSTRAINT "FK_7e42bb5455204758b462fdb0b1a"
        `);
        await queryRunner.query(`
            ALTER TABLE "raiting_book_id_book" DROP CONSTRAINT "FK_0284ad456e561d2de083721ae39"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_168ab61c2390c5d6a05d5b7985"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_ca224bf7fd08d432d989b571f1"
        `);
        await queryRunner.query(`
            DROP TABLE "raiting_user_id_user"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_7e42bb5455204758b462fdb0b1"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_0284ad456e561d2de083721ae3"
        `);
        await queryRunner.query(`
            DROP TABLE "raiting_book_id_book"
        `);
    }

}
