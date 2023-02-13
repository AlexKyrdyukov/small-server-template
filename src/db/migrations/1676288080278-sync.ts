import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1676288080278 implements MigrationInterface {
    name = 'sync1676288080278'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "cart_products" DROP CONSTRAINT "FK_a1479cb4a32fab53ed4ff2b420b"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_products" DROP CONSTRAINT "REL_a1479cb4a32fab53ed4ff2b420"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_products" DROP COLUMN "bookBookId"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "cart_products"
            ADD "bookBookId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_products"
            ADD CONSTRAINT "REL_a1479cb4a32fab53ed4ff2b420" UNIQUE ("bookBookId")
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_products"
            ADD CONSTRAINT "FK_a1479cb4a32fab53ed4ff2b420b" FOREIGN KEY ("bookBookId") REFERENCES "book"("bookId") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
