import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1677010755379 implements MigrationInterface {
    name = 'sync1677010755379'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`
        //     CREATE TABLE "cart_products" (
        //         "cartProductId" SERIAL NOT NULL,
        //         "createdDate" TIMESTAMP NOT NULL DEFAULT now(),
        //         "updatedDate" TIMESTAMP NOT NULL DEFAULT now(),
        //         "deletedDate" TIMESTAMP,
        //         "countBook" integer NOT NULL,
        //         "bookId" integer NOT NULL,
        //         "usersUserId" integer,
        //         "bookBookId" integer,
        //         CONSTRAINT "PK_20e8c8cfafad33f6f8e1f8e166b" PRIMARY KEY ("cartProductId")
        //     )
        // `);
        // await queryRunner.query(`
        //     ALTER TABLE "cart_products"
        //     ADD CONSTRAINT "FK_f05332fc81d4f97e75f8314ac05" FOREIGN KEY ("usersUserId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION
        // `);
        // await queryRunner.query(`
        //     ALTER TABLE "cart_products"
        //     ADD CONSTRAINT "FK_a1479cb4a32fab53ed4ff2b420b" FOREIGN KEY ("bookBookId") REFERENCES "book"("bookId") ON DELETE NO ACTION ON UPDATE NO ACTION
        // `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "cart_products" DROP CONSTRAINT "FK_a1479cb4a32fab53ed4ff2b420b"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_products" DROP CONSTRAINT "FK_f05332fc81d4f97e75f8314ac05"
        `);
        await queryRunner.query(`
            DROP TABLE "cart_products"
        `);
    }

}
