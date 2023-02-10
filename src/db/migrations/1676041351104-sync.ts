import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1676041351104 implements MigrationInterface {
    name = 'sync1676041351104'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "raiting"
            ADD "bookIdBookId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "raiting"
            ADD "userIdUserId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "raiting"
            ADD CONSTRAINT "FK_33af7b7138c61eddd215159fe44" FOREIGN KEY ("bookIdBookId") REFERENCES "book"("bookId") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "raiting"
            ADD CONSTRAINT "FK_0b063e6c398122817ee14317fc6" FOREIGN KEY ("userIdUserId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "raiting" DROP CONSTRAINT "FK_0b063e6c398122817ee14317fc6"
        `);
        await queryRunner.query(`
            ALTER TABLE "raiting" DROP CONSTRAINT "FK_33af7b7138c61eddd215159fe44"
        `);
        await queryRunner.query(`
            ALTER TABLE "raiting" DROP COLUMN "userIdUserId"
        `);
        await queryRunner.query(`
            ALTER TABLE "raiting" DROP COLUMN "bookIdBookId"
        `);
    }

}
