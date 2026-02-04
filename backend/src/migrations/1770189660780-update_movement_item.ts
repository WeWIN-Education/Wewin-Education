import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateMovementItem1770189660780 implements MigrationInterface {
    name = 'UpdateMovementItem1770189660780'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "role" ADD "is_active" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "role" ADD "create_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "role" ADD "update_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "role" ADD "delete_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "user" ADD "is_active" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "user" ADD "create_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "update_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "delete_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "inventory_movement_item" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "inventory_movement_item" DROP CONSTRAINT "PK_f927cde80cf2fe0cb852f577230"`);
        await queryRunner.query(`ALTER TABLE "inventory_movement_item" ADD CONSTRAINT "PK_ab6ee0a6133dcb887085cecf7bb" PRIMARY KEY ("inventory_id", "product_id", "id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventory_movement_item" DROP CONSTRAINT "PK_ab6ee0a6133dcb887085cecf7bb"`);
        await queryRunner.query(`ALTER TABLE "inventory_movement_item" ADD CONSTRAINT "PK_f927cde80cf2fe0cb852f577230" PRIMARY KEY ("inventory_id", "product_id")`);
        await queryRunner.query(`ALTER TABLE "inventory_movement_item" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "delete_at"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "update_at"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "create_at"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "is_active"`);
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "delete_at"`);
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "update_at"`);
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "create_at"`);
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "is_active"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "isActive" boolean NOT NULL DEFAULT true`);
    }

}
