import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1674228186372 implements MigrationInterface {
    name = 'sync1674228186372'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "raiting" DROP CONSTRAINT "PK_2d1a6b619eaf28bef9da0da1bbc"
        `);
        await queryRunner.query(`
            ALTER TABLE "raiting" DROP COLUMN "id"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "createdDate" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "updatedDate" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "deletedDate" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "genres"
            ADD "createdDate" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "genres"
            ADD "updatedDate" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "genres"
            ADD "deletedDate" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "cart"
            ADD "createdDate" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "cart"
            ADD "updatedDate" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "cart"
            ADD "deletedDate" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "raiting"
            ADD "raitingId" SERIAL NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "raiting"
            ADD CONSTRAINT "PK_25eab5cd00df865bad7d5b9ecbd" PRIMARY KEY ("raitingId")
        `);
        await queryRunner.query(`
            ALTER TABLE "raiting"
            ADD "createdDate" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "raiting"
            ADD "updatedDate" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "raiting"
            ADD "deletedDate" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "createdDate" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "updatedDate" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "deletedDate" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "new" boolean
        `);
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "coverType"
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."book_covertype_enum" AS ENUM('Hardcover', 'Paperback')
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "coverType" "public"."book_covertype_enum" NOT NULL DEFAULT 'Hardcover'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "coverType"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."book_covertype_enum"
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "coverType" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "new"
        `);
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "deletedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "updatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "createdDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "raiting" DROP COLUMN "deletedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "raiting" DROP COLUMN "updatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "raiting" DROP COLUMN "createdDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "raiting" DROP CONSTRAINT "PK_25eab5cd00df865bad7d5b9ecbd"
        `);
        await queryRunner.query(`
            ALTER TABLE "raiting" DROP COLUMN "raitingId"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart" DROP COLUMN "deletedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart" DROP COLUMN "updatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart" DROP COLUMN "createdDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "genres" DROP COLUMN "deletedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "genres" DROP COLUMN "updatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "genres" DROP COLUMN "createdDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "deletedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "updatedDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "createdDate"
        `);
        await queryRunner.query(`
            ALTER TABLE "raiting"
            ADD "id" SERIAL NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "raiting"
            ADD CONSTRAINT "PK_2d1a6b619eaf28bef9da0da1bbc" PRIMARY KEY ("id")
        `);
    }

}
