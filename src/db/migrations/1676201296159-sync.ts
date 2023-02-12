import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1676201296159 implements MigrationInterface {
    name = 'sync1676201296159'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book" DROP CONSTRAINT "FK_8e08ded753c26dad89ca38c8d27"
        `);
        await queryRunner.query(`
            CREATE TABLE "cart_product" (
                "cartProductId" SERIAL NOT NULL,
                "createdDate" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedDate" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedDate" TIMESTAMP,
                "countBook" integer NOT NULL,
                "bookId" integer NOT NULL,
                "userCartCartId" integer,
                "bookBookId" integer,
                CONSTRAINT "UQ_93aea173ebaa64e560e24676147" UNIQUE ("bookId"),
                CONSTRAINT "REL_930eccaab0bd576bed6f3d8214" UNIQUE ("bookBookId"),
                CONSTRAINT "PK_5d4e55e1919eac58b7d3ec7fc2a" PRIMARY KEY ("cartProductId")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "bookInCartCartId"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_product"
            ADD CONSTRAINT "FK_795e010533eb33ce62e3b5e2843" FOREIGN KEY ("userCartCartId") REFERENCES "cart"("cartId") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_product"
            ADD CONSTRAINT "FK_930eccaab0bd576bed6f3d82145" FOREIGN KEY ("bookBookId") REFERENCES "book"("bookId") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "cart_product" DROP CONSTRAINT "FK_930eccaab0bd576bed6f3d82145"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_product" DROP CONSTRAINT "FK_795e010533eb33ce62e3b5e2843"
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "bookInCartCartId" integer
        `);
        await queryRunner.query(`
            DROP TABLE "cart_product"
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD CONSTRAINT "FK_8e08ded753c26dad89ca38c8d27" FOREIGN KEY ("bookInCartCartId") REFERENCES "cart"("cartId") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
