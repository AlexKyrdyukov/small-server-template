import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1674065006915 implements MigrationInterface {
    name = 'sync1674065006915'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book_genres_genres" DROP CONSTRAINT "FK_bbd4b3ebbbe38dd95113b400c37"
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genres_genres" DROP CONSTRAINT "FK_ba73b7f2901953b05c4c6ec7258"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_bbd4b3ebbbe38dd95113b400c3"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_ba73b7f2901953b05c4c6ec725"
        `);
        await queryRunner.query(`
            ALTER TABLE "genres"
                RENAME COLUMN "id" TO "genresId"
        `);
        await queryRunner.query(`
            ALTER TABLE "genres"
                RENAME CONSTRAINT "PK_80ecd718f0f00dde5d77a9be842" TO "PK_e1ca251374b09a5fa27b730be44"
        `);
        await queryRunner.query(`
            ALTER SEQUENCE "genres_id_seq"
            RENAME TO "genres_genresId_seq"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
                RENAME COLUMN "id" TO "userId"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
                RENAME CONSTRAINT "PK_cace4a159ff9f2512dd42373760" TO "PK_d72ea127f30e21753c9e229891e"
        `);
        await queryRunner.query(`
            ALTER SEQUENCE "user_id_seq"
            RENAME TO "user_userId_seq"
        `);
        await queryRunner.query(`
            CREATE TABLE "cart" (
                "cartId" SERIAL NOT NULL,
                "userId" integer NOT NULL,
                CONSTRAINT "PK_91b0c422e2c5187437d4dd29747" PRIMARY KEY ("cartId")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "book" DROP CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4"
        `);
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "id"
        `);
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "annotation"
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genres_genres" DROP CONSTRAINT "PK_687d2e122fd011d88def4ecc323"
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genres_genres"
            ADD CONSTRAINT "PK_ba73b7f2901953b05c4c6ec7258" PRIMARY KEY ("genresId")
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genres_genres" DROP COLUMN "bookId"
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genres_genres" DROP CONSTRAINT "PK_ba73b7f2901953b05c4c6ec7258"
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genres_genres" DROP COLUMN "genresId"
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "bookId" SERIAL NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD CONSTRAINT "PK_dc3b1731d65c319e954cb621c1b" PRIMARY KEY ("bookId")
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "bestSeller" boolean
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genres_genres"
            ADD "bookBookId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genres_genres"
            ADD CONSTRAINT "PK_6217eccc43d74c9d152f188d812" PRIMARY KEY ("bookBookId")
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genres_genres"
            ADD "genresGenresId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genres_genres" DROP CONSTRAINT "PK_6217eccc43d74c9d152f188d812"
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genres_genres"
            ADD CONSTRAINT "PK_e509a249faf73abcea1937e037c" PRIMARY KEY ("bookBookId", "genresGenresId")
        `);
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "price"
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "price" integer NOT NULL
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_6217eccc43d74c9d152f188d81" ON "book_genres_genres" ("bookBookId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_95f4cf114d378a80368ca46198" ON "book_genres_genres" ("genresGenresId")
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genres_genres"
            ADD CONSTRAINT "FK_6217eccc43d74c9d152f188d812" FOREIGN KEY ("bookBookId") REFERENCES "book"("bookId") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genres_genres"
            ADD CONSTRAINT "FK_95f4cf114d378a80368ca461984" FOREIGN KEY ("genresGenresId") REFERENCES "genres"("genresId") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book_genres_genres" DROP CONSTRAINT "FK_95f4cf114d378a80368ca461984"
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genres_genres" DROP CONSTRAINT "FK_6217eccc43d74c9d152f188d812"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_95f4cf114d378a80368ca46198"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_6217eccc43d74c9d152f188d81"
        `);
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "price"
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "price" numeric NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genres_genres" DROP CONSTRAINT "PK_e509a249faf73abcea1937e037c"
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genres_genres"
            ADD CONSTRAINT "PK_6217eccc43d74c9d152f188d812" PRIMARY KEY ("bookBookId")
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genres_genres" DROP COLUMN "genresGenresId"
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genres_genres" DROP CONSTRAINT "PK_6217eccc43d74c9d152f188d812"
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genres_genres" DROP COLUMN "bookBookId"
        `);
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "bestSeller"
        `);
        await queryRunner.query(`
            ALTER TABLE "book" DROP CONSTRAINT "PK_dc3b1731d65c319e954cb621c1b"
        `);
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "bookId"
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genres_genres"
            ADD "genresId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genres_genres"
            ADD CONSTRAINT "PK_ba73b7f2901953b05c4c6ec7258" PRIMARY KEY ("genresId")
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genres_genres"
            ADD "bookId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genres_genres" DROP CONSTRAINT "PK_ba73b7f2901953b05c4c6ec7258"
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genres_genres"
            ADD CONSTRAINT "PK_687d2e122fd011d88def4ecc323" PRIMARY KEY ("bookId", "genresId")
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "annotation" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "id" SERIAL NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id")
        `);
        await queryRunner.query(`
            DROP TABLE "cart"
        `);
        await queryRunner.query(`
            ALTER SEQUENCE "user_userId_seq"
            RENAME TO "user_id_seq"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
                RENAME CONSTRAINT "PK_d72ea127f30e21753c9e229891e" TO "PK_cace4a159ff9f2512dd42373760"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
                RENAME COLUMN "userId" TO "id"
        `);
        await queryRunner.query(`
            ALTER SEQUENCE "genres_genresId_seq"
            RENAME TO "genres_id_seq"
        `);
        await queryRunner.query(`
            ALTER TABLE "genres"
                RENAME CONSTRAINT "PK_e1ca251374b09a5fa27b730be44" TO "PK_80ecd718f0f00dde5d77a9be842"
        `);
        await queryRunner.query(`
            ALTER TABLE "genres"
                RENAME COLUMN "genresId" TO "id"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_ba73b7f2901953b05c4c6ec725" ON "book_genres_genres" ("genresId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_bbd4b3ebbbe38dd95113b400c3" ON "book_genres_genres" ("bookId")
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genres_genres"
            ADD CONSTRAINT "FK_ba73b7f2901953b05c4c6ec7258" FOREIGN KEY ("genresId") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genres_genres"
            ADD CONSTRAINT "FK_bbd4b3ebbbe38dd95113b400c37" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

}
