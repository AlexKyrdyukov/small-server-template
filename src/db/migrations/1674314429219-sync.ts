import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1674314429219 implements MigrationInterface {
    name = 'sync1674314429219'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user" (
                "userId" SERIAL NOT NULL,
                "createdDate" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedDate" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedDate" TIMESTAMP,
                "password" character varying NOT NULL,
                "fullName" character varying,
                "email" character varying NOT NULL,
                "avatar" character varying,
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                CONSTRAINT "PK_d72ea127f30e21753c9e229891e" PRIMARY KEY ("userId")
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."book_covertype_enum" AS ENUM('Hardcover', 'Paperback')
        `);
        await queryRunner.query(`
            CREATE TABLE "book" (
                "bookId" SERIAL NOT NULL,
                "createdDate" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedDate" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedDate" TIMESTAMP,
                "name" character varying NOT NULL,
                "author" character varying NOT NULL,
                "price" integer NOT NULL,
                "raiting" integer NOT NULL,
                "isInStock" boolean NOT NULL,
                "coverType" "public"."book_covertype_enum" NOT NULL DEFAULT 'Hardcover',
                "bestSeller" boolean,
                "new" boolean,
                "description" character varying NOT NULL,
                "image" character varying NOT NULL,
                "dateOfIssue" date NOT NULL,
                CONSTRAINT "PK_dc3b1731d65c319e954cb621c1b" PRIMARY KEY ("bookId")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "genres" (
                "genreId" SERIAL NOT NULL,
                "createdDate" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedDate" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedDate" TIMESTAMP,
                "name" character varying NOT NULL,
                CONSTRAINT "UQ_f105f8230a83b86a346427de94d" UNIQUE ("name"),
                CONSTRAINT "PK_8e3e2a59aac7ee7889b047fdc0c" PRIMARY KEY ("genreId")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "raiting" (
                "raitingId" SERIAL NOT NULL,
                "createdDate" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedDate" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedDate" TIMESTAMP,
                "userId" integer NOT NULL,
                CONSTRAINT "PK_25eab5cd00df865bad7d5b9ecbd" PRIMARY KEY ("raitingId")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "cart" (
                "cartId" SERIAL NOT NULL,
                "createdDate" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedDate" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedDate" TIMESTAMP,
                "userId" integer NOT NULL,
                CONSTRAINT "PK_91b0c422e2c5187437d4dd29747" PRIMARY KEY ("cartId")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "book_genres_genres" (
                "bookBookId" integer NOT NULL,
                "genresGenreId" integer NOT NULL,
                CONSTRAINT "PK_b418365b81052b0180a92c3d749" PRIMARY KEY ("bookBookId", "genresGenreId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_6217eccc43d74c9d152f188d81" ON "book_genres_genres" ("bookBookId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_ad22a4542c036dfaf81ea1fb97" ON "book_genres_genres" ("genresGenreId")
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genres_genres"
            ADD CONSTRAINT "FK_6217eccc43d74c9d152f188d812" FOREIGN KEY ("bookBookId") REFERENCES "book"("bookId") ON DELETE CASCADE ON UPDATE CASCADE
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
            ALTER TABLE "book_genres_genres" DROP CONSTRAINT "FK_6217eccc43d74c9d152f188d812"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_ad22a4542c036dfaf81ea1fb97"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_6217eccc43d74c9d152f188d81"
        `);
        await queryRunner.query(`
            DROP TABLE "book_genres_genres"
        `);
        await queryRunner.query(`
            DROP TABLE "cart"
        `);
        await queryRunner.query(`
            DROP TABLE "raiting"
        `);
        await queryRunner.query(`
            DROP TABLE "genres"
        `);
        await queryRunner.query(`
            DROP TABLE "book"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."book_covertype_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
    }

}
