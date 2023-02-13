import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1676294382978 implements MigrationInterface {
    name = 'sync1676294382978'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "cart_products" DROP CONSTRAINT "FK_ed14c8ba469ba03b96ae4f197cd"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_products" DROP COLUMN "userCartCartId"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "cart_products"
            ADD "userCartCartId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_products"
            ADD CONSTRAINT "FK_ed14c8ba469ba03b96ae4f197cd" FOREIGN KEY ("userCartCartId") REFERENCES "cart"("cartId") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
