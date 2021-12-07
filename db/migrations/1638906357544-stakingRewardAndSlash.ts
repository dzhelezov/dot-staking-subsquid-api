import {MigrationInterface, QueryRunner} from "typeorm";

export class stakingRewardAndSlash1638906357544 implements MigrationInterface {
    name = 'stakingRewardAndSlash1638906357544'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "no_bond_record_account" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" character varying NOT NULL, "updated_at" TIMESTAMP DEFAULT now(), "updated_by_id" character varying, "deleted_at" TIMESTAMP, "deleted_by_id" character varying, "version" integer NOT NULL, "first_reward_at" integer NOT NULL, CONSTRAINT "PK_547e29f031b2605875d1705f4a1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "staking_slash" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" character varying NOT NULL, "updated_at" TIMESTAMP DEFAULT now(), "updated_by_id" character varying, "deleted_at" TIMESTAMP, "deleted_by_id" character varying, "version" integer NOT NULL, "account_id" character varying NOT NULL, "balance" numeric NOT NULL, "date" TIMESTAMP NOT NULL, CONSTRAINT "PK_3e74c2a899ae0f904f4142a4d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sum_reward" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" character varying NOT NULL, "updated_at" TIMESTAMP DEFAULT now(), "updated_by_id" character varying, "deleted_at" TIMESTAMP, "deleted_by_id" character varying, "version" integer NOT NULL, "account_reward" numeric NOT NULL, "account_slash" numeric NOT NULL, "account_total" numeric NOT NULL, CONSTRAINT "PK_b2d0e49d114fbf29b6bed61e262" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "staking_reward" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" character varying NOT NULL, "updated_at" TIMESTAMP DEFAULT now(), "updated_by_id" character varying, "deleted_at" TIMESTAMP, "deleted_by_id" character varying, "version" integer NOT NULL, "account_id" character varying NOT NULL, "balance" numeric NOT NULL, "date" TIMESTAMP NOT NULL, CONSTRAINT "PK_63b6754f195dbb71232f598485b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "staking_slash" ADD CONSTRAINT "FK_73664be4d41309d8269a9e85afd" FOREIGN KEY ("account_id") REFERENCES "sum_reward"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "staking_reward" ADD CONSTRAINT "FK_a13699fe2651c6c2717a7076f57" FOREIGN KEY ("account_id") REFERENCES "sum_reward"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "staking_reward" DROP CONSTRAINT "FK_a13699fe2651c6c2717a7076f57"`);
        await queryRunner.query(`ALTER TABLE "staking_slash" DROP CONSTRAINT "FK_73664be4d41309d8269a9e85afd"`);
        await queryRunner.query(`DROP TABLE "staking_reward"`);
        await queryRunner.query(`DROP TABLE "sum_reward"`);
        await queryRunner.query(`DROP TABLE "staking_slash"`);
        await queryRunner.query(`DROP TABLE "no_bond_record_account"`);
    }

}
