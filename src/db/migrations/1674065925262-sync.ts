import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1674065925262 implements MigrationInterface {
    name = 'sync1674065925262'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book_genres_genres" DROP CONSTRAINT "FK_95f4cf114d378a80368ca461984"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_95f4cf114d378a80368ca46198"
        `);
        await queryRunner.query(`
            ALTER TABLE "genres"
                RENAME COLUMN "genresId" TO "genreId"
        `);
        await queryRunner.query(`
            ALTER TABLE "genres"
                RENAME CONSTRAINT "PK_e1ca251374b09a5fa27b730be44" TO "PK_8e3e2a59aac7ee7889b047fdc0c"
        `);
        await queryRunner.query(`
            ALTER SEQUENCE "genres_genresId_seq"
            RENAME TO "genres_genreId_seq"
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genres_genres"
                RENAME COLUMN "genresGenresId" TO "genresGenreId"
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genres_genres"
                RENAME CONSTRAINT "PK_e509a249faf73abcea1937e037c" TO "PK_b418365b81052b0180a92c3d749"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_ad22a4542c036dfaf81ea1fb97" ON "book_genres_genres" ("genresGenreId")
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genres_genres"
            ADD CONSTRAINT "FK_ad22a4542c036dfaf81ea1fb979" FOREIGN KEY ("genresGenreId") REFERENCES "genres"("genreId") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book_genres_genres" DROP CONSTRAINT "FK_ad22a4542c036dfaf81ea1fb979"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_ad22a4542c036dfaf81ea1fb97"
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genres_genres"
                RENAME CONSTRAINT "PK_b418365b81052b0180a92c3d749" TO "PK_e509a249faf73abcea1937e037c"
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genres_genres"
                RENAME COLUMN "genresGenreId" TO "genresGenresId"
        `);
        await queryRunner.query(`
            ALTER SEQUENCE "genres_genreId_seq"
            RENAME TO "genres_genresId_seq"
        `);
        await queryRunner.query(`
            ALTER TABLE "genres"
                RENAME CONSTRAINT "PK_8e3e2a59aac7ee7889b047fdc0c" TO "PK_e1ca251374b09a5fa27b730be44"
        `);
        await queryRunner.query(`
            ALTER TABLE "genres"
                RENAME COLUMN "genreId" TO "genresId"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_95f4cf114d378a80368ca46198" ON "book_genres_genres" ("genresGenresId")
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genres_genres"
            ADD CONSTRAINT "FK_95f4cf114d378a80368ca461984" FOREIGN KEY ("genresGenresId") REFERENCES "genres"("genresId") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
