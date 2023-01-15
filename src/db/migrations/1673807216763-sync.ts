import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1673807216763 implements MigrationInterface {
    name = 'sync1673807216763'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "books" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "author" character varying NOT NULL,
                "price" character varying,
                "raiting" integer,
                "coverType" character varying NOT NULL,
                "annotation" character varying,
                "image" character varying NOT NULL,
                "genres" character varying NOT NULL,
                CONSTRAINT "UQ_daaf43033f8883943d0734e6743" UNIQUE ("name"),
                CONSTRAINT "UQ_4675aad2c57a7a793d26afbae99" UNIQUE ("author"),
                CONSTRAINT "UQ_85c55aed18830b723dd8216b1e7" UNIQUE ("image"),
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
            CREATE TABLE "genres" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                CONSTRAINT "UQ_f105f8230a83b86a346427de94d" UNIQUE ("name"),
                CONSTRAINT "PK_80ecd718f0f00dde5d77a9be842" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "genres"
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
    }

}
