import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1676038432142 implements MigrationInterface {
    name = 'sync1676038432142'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "raiting" DROP CONSTRAINT "FK_33af7b7138c61eddd215159fe44"
        `);
        await queryRunner.query(`
            ALTER TABLE "raiting" DROP COLUMN "bookIdBookId"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "raiting"
            ADD "bookIdBookId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "raiting"
            ADD CONSTRAINT "FK_33af7b7138c61eddd215159fe44" FOREIGN KEY ("bookIdBookId") REFERENCES "book"("bookId") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
