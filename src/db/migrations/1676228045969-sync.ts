import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1676228045969 implements MigrationInterface {
    name = 'sync1676228045969'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "FK_2da1775a2a8d77cc187fa890030"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
                RENAME COLUMN "cartIdCartId" TO "cartCartId"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
                RENAME CONSTRAINT "UQ_2da1775a2a8d77cc187fa890030" TO "UQ_a4ba4280d134a4f1117dfc3e9b7"
        `);
        await queryRunner.query(`
            CREATE TABLE "cart_products" (
                "cartProductId" SERIAL NOT NULL,
                "createdDate" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedDate" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedDate" TIMESTAMP,
                "countBook" integer NOT NULL,
                "bookId" integer NOT NULL,
                "userCartCartId" integer,
                "bookBookId" integer,
                CONSTRAINT "UQ_3388decc0c68bca5f8038efca37" UNIQUE ("bookId"),
                CONSTRAINT "REL_a1479cb4a32fab53ed4ff2b420" UNIQUE ("bookBookId"),
                CONSTRAINT "PK_20e8c8cfafad33f6f8e1f8e166b" PRIMARY KEY ("cartProductId")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "FK_a4ba4280d134a4f1117dfc3e9b7" FOREIGN KEY ("cartCartId") REFERENCES "cart"("cartId") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_products"
            ADD CONSTRAINT "FK_ed14c8ba469ba03b96ae4f197cd" FOREIGN KEY ("userCartCartId") REFERENCES "cart"("cartId") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_products"
            ADD CONSTRAINT "FK_a1479cb4a32fab53ed4ff2b420b" FOREIGN KEY ("bookBookId") REFERENCES "book"("bookId") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "cart_products" DROP CONSTRAINT "FK_a1479cb4a32fab53ed4ff2b420b"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_products" DROP CONSTRAINT "FK_ed14c8ba469ba03b96ae4f197cd"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "FK_a4ba4280d134a4f1117dfc3e9b7"
        `);
        await queryRunner.query(`
            DROP TABLE "cart_products"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
                RENAME CONSTRAINT "UQ_a4ba4280d134a4f1117dfc3e9b7" TO "UQ_2da1775a2a8d77cc187fa890030"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
                RENAME COLUMN "cartCartId" TO "cartIdCartId"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "FK_2da1775a2a8d77cc187fa890030" FOREIGN KEY ("cartIdCartId") REFERENCES "cart"("cartId") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
