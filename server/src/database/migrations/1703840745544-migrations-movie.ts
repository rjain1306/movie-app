import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1703840745544 implements MigrationInterface {
    name = 'Migrations1703840745544'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "movie" ("id" uuid NOT NULL, "title" character varying NOT NULL, "publish_year" character varying NOT NULL, "image_url" character varying, "created_at" TIMESTAMP NOT NULL, "created_by" uuid, "updated_at" TIMESTAMP NOT NULL, "updated_by" uuid, CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "movie"`);
    }

}
