import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1703705507075 implements MigrationInterface {
    name = 'Migrations1703705507075'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL, "name" character varying NOT NULL, "email_address" character varying NOT NULL, "password" character varying NOT NULL, "image_url" character varying, "created_at" TIMESTAMP NOT NULL, "created_by" uuid, "updated_at" TIMESTAMP NOT NULL, "updated_by" uuid, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
