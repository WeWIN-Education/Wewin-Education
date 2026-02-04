import { MigrationInterface, QueryRunner } from "typeorm";

export class InventoryEntities1770190638761 implements MigrationInterface {
    name = 'InventoryEntities1770190638761'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventory_movement_item" DROP CONSTRAINT "FK_6ce27b767f668d78459a5d986c5"`);
        await queryRunner.query(`ALTER TABLE "inventory_movement_item" DROP CONSTRAINT "FK_b866735f579da0369e232a2e30a"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "inventory_movement_item" DROP CONSTRAINT "PK_ab6ee0a6133dcb887085cecf7bb"`);
        await queryRunner.query(`ALTER TABLE "inventory_movement_item" ADD CONSTRAINT "PK_649498e090d9a16c56f85cd58a3" PRIMARY KEY ("product_id", "id")`);
        await queryRunner.query(`ALTER TABLE "inventory_movement_item" DROP COLUMN "inventory_id"`);
        await queryRunner.query(`ALTER TABLE "role" ADD "is_active" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "role" ADD "create_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "role" ADD "update_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "role" ADD "delete_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "user" ADD "is_active" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "user" ADD "create_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "update_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "delete_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "inventory_movement_item" ADD "inventory_movement_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "inventory_movement_item" DROP CONSTRAINT "PK_649498e090d9a16c56f85cd58a3"`);
        await queryRunner.query(`ALTER TABLE "inventory_movement_item" ADD CONSTRAINT "PK_3fe37eff9ec1822c52ea3dbe226" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "inventory_movement_item" ALTER COLUMN "quantity" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "inventory_movement_item" ADD CONSTRAINT "UQ_eb23e43f30c42c887ca32c812d8" UNIQUE ("inventory_movement_id", "product_id")`);
        await queryRunner.query(`ALTER TABLE "inventory_movement_item" ADD CONSTRAINT "FK_d68222d8604bf365c7b20755415" FOREIGN KEY ("inventory_movement_id") REFERENCES "inventory_movement"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory_movement_item" ADD CONSTRAINT "FK_b866735f579da0369e232a2e30a" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventory_movement_item" DROP CONSTRAINT "FK_b866735f579da0369e232a2e30a"`);
        await queryRunner.query(`ALTER TABLE "inventory_movement_item" DROP CONSTRAINT "FK_d68222d8604bf365c7b20755415"`);
        await queryRunner.query(`ALTER TABLE "inventory_movement_item" DROP CONSTRAINT "UQ_eb23e43f30c42c887ca32c812d8"`);
        await queryRunner.query(`ALTER TABLE "inventory_movement_item" ALTER COLUMN "quantity" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "inventory_movement_item" DROP CONSTRAINT "PK_3fe37eff9ec1822c52ea3dbe226"`);
        await queryRunner.query(`ALTER TABLE "inventory_movement_item" ADD CONSTRAINT "PK_649498e090d9a16c56f85cd58a3" PRIMARY KEY ("product_id", "id")`);
        await queryRunner.query(`ALTER TABLE "inventory_movement_item" DROP COLUMN "inventory_movement_id"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "delete_at"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "update_at"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "create_at"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "is_active"`);
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "delete_at"`);
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "update_at"`);
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "create_at"`);
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "is_active"`);
        await queryRunner.query(`ALTER TABLE "inventory_movement_item" ADD "inventory_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "inventory_movement_item" DROP CONSTRAINT "PK_649498e090d9a16c56f85cd58a3"`);
        await queryRunner.query(`ALTER TABLE "inventory_movement_item" ADD CONSTRAINT "PK_ab6ee0a6133dcb887085cecf7bb" PRIMARY KEY ("inventory_id", "product_id", "id")`);
        await queryRunner.query(`ALTER TABLE "user" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "inventory_movement_item" ADD CONSTRAINT "FK_b866735f579da0369e232a2e30a" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory_movement_item" ADD CONSTRAINT "FK_6ce27b767f668d78459a5d986c5" FOREIGN KEY ("inventory_id") REFERENCES "inventory_movement"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
