import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1673939653357 implements MigrationInterface {
    name = 'sync1673939653357'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "genres" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                CONSTRAINT "UQ_f105f8230a83b86a346427de94d" UNIQUE ("name"),
                CONSTRAINT "PK_80ecd718f0f00dde5d77a9be842" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "book" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "author" character varying NOT NULL,
                "price" integer NOT NULL,
                "raiting" integer NOT NULL,
                "coverType" character varying NOT NULL,
                "annotation" character varying,
                "description" character varying NOT NULL,
                "image" character varying NOT NULL,
                CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "basket" (
                "id" SERIAL NOT NULL,
                "userId" integer NOT NULL,
                CONSTRAINT "PK_895e6f44b73a72425e434a614cc" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "password" character varying NOT NULL,
                "fullName" character varying,
                "email" character varying NOT NULL,
                "avatar" character varying,
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "raiting" (
                "id" SERIAL NOT NULL,
                "userId" integer NOT NULL,
                CONSTRAINT "PK_2d1a6b619eaf28bef9da0da1bbc" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "book_genres_genres" (
                "bookId" integer NOT NULL,
                "genresId" integer NOT NULL,
                CONSTRAINT "PK_687d2e122fd011d88def4ecc323" PRIMARY KEY ("bookId", "genresId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_bbd4b3ebbbe38dd95113b400c3" ON "book_genres_genres" ("bookId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_ba73b7f2901953b05c4c6ec725" ON "book_genres_genres" ("genresId")
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genres_genres"
            ADD CONSTRAINT "FK_bbd4b3ebbbe38dd95113b400c37" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genres_genres"
            ADD CONSTRAINT "FK_ba73b7f2901953b05c4c6ec7258" FOREIGN KEY ("genresId") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book_genres_genres" DROP CONSTRAINT "FK_ba73b7f2901953b05c4c6ec7258"
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genres_genres" DROP CONSTRAINT "FK_bbd4b3ebbbe38dd95113b400c37"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_ba73b7f2901953b05c4c6ec725"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_bbd4b3ebbbe38dd95113b400c3"
        `);
        await queryRunner.query(`
            DROP TABLE "book_genres_genres"
        `);
        await queryRunner.query(`
            DROP TABLE "raiting"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP TABLE "basket"
        `);
        await queryRunner.query(`
            DROP TABLE "book"
        `);
        await queryRunner.query(`
            DROP TABLE "genres"
        `);
    }

}
