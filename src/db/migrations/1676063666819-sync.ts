import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1676063666819 implements MigrationInterface {
    name = 'sync1676063666819'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user_set_raitings_raiting" (
                "userUserId" integer NOT NULL,
                "raitingRaitingId" integer NOT NULL,
                CONSTRAINT "PK_80c9061f9182e5e414b7d9b129e" PRIMARY KEY ("userUserId", "raitingRaitingId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_5d8dae5c308eab10579a8a273d" ON "user_set_raitings_raiting" ("userUserId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_ea78ffef4117918cbc71d5dd4f" ON "user_set_raitings_raiting" ("raitingRaitingId")
        `);
        await queryRunner.query(`
            ALTER TABLE "user_set_raitings_raiting"
            ADD CONSTRAINT "FK_5d8dae5c308eab10579a8a273dc" FOREIGN KEY ("userUserId") REFERENCES "user"("userId") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "user_set_raitings_raiting"
            ADD CONSTRAINT "FK_ea78ffef4117918cbc71d5dd4f4" FOREIGN KEY ("raitingRaitingId") REFERENCES "raiting"("raitingId") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user_set_raitings_raiting" DROP CONSTRAINT "FK_ea78ffef4117918cbc71d5dd4f4"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_set_raitings_raiting" DROP CONSTRAINT "FK_5d8dae5c308eab10579a8a273dc"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_ea78ffef4117918cbc71d5dd4f"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_5d8dae5c308eab10579a8a273d"
        `);
        await queryRunner.query(`
            DROP TABLE "user_set_raitings_raiting"
        `);
    }

}
