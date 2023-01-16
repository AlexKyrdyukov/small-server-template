import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1673904290596 implements MigrationInterface {
    name = 'sync1673904290596'

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
            CREATE TABLE "books" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "author" character varying NOT NULL,
                "price" integer NOT NULL,
                "raiting" integer NOT NULL,
                "coverType" character varying NOT NULL,
                "annotation" character varying,
                "description" character varying NOT NULL,
                "image" character varying NOT NULL,
                CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id")
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
            CREATE TABLE "raiting" (
                "id" SERIAL NOT NULL,
                "userId" integer NOT NULL,
                CONSTRAINT "PK_2d1a6b619eaf28bef9da0da1bbc" PRIMARY KEY ("id")
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
            CREATE TABLE "books_genres_genres" (
                "booksId" integer NOT NULL,
                "genresId" integer NOT NULL,
                CONSTRAINT "PK_5773bf45b53a35762fd16cc97a0" PRIMARY KEY ("booksId", "genresId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_e1c8b5fb4c9afac80b2591b0c8" ON "books_genres_genres" ("booksId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_8d2218df7344c443d9ded15492" ON "books_genres_genres" ("genresId")
        `);
        await queryRunner.query(`
            ALTER TABLE "books_genres_genres"
            ADD CONSTRAINT "FK_e1c8b5fb4c9afac80b2591b0c84" FOREIGN KEY ("booksId") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "books_genres_genres"
            ADD CONSTRAINT "FK_8d2218df7344c443d9ded154921" FOREIGN KEY ("genresId") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "books_genres_genres" DROP CONSTRAINT "FK_8d2218df7344c443d9ded154921"
        `);
        await queryRunner.query(`
            ALTER TABLE "books_genres_genres" DROP CONSTRAINT "FK_e1c8b5fb4c9afac80b2591b0c84"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_8d2218df7344c443d9ded15492"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_e1c8b5fb4c9afac80b2591b0c8"
        `);
        await queryRunner.query(`
            DROP TABLE "books_genres_genres"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP TABLE "raiting"
        `);
        await queryRunner.query(`
            DROP TABLE "basket"
        `);
        await queryRunner.query(`
            DROP TABLE "books"
        `);
        await queryRunner.query(`
            DROP TABLE "genres"
        `);
    }

}
