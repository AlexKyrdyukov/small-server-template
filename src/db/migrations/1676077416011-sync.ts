import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1676077416011 implements MigrationInterface {
    name = 'sync1676077416011'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "raiting" (
                "raitingId" SERIAL NOT NULL,
                "createdDate" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedDate" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedDate" TIMESTAMP,
                "raiting" integer NOT NULL,
                "bookIdBookId" integer,
                "userIdUserId" integer,
                CONSTRAINT "PK_25eab5cd00df865bad7d5b9ecbd" PRIMARY KEY ("raitingId")
            )
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
            DROP TABLE "raiting"
        `);
    }

}
