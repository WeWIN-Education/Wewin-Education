import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateBaseEntity1767265406533 implements MigrationInterface {
    name = 'UpdateBaseEntity1767265406533'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permission" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "permission" ADD "createAt" date NOT NULL DEFAULT ('now'::text)::date`);
        await queryRunner.query(`ALTER TABLE "permission" ADD "updateAt" date NOT NULL DEFAULT ('now'::text)::date`);
        await queryRunner.query(`ALTER TABLE "role" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "role" ADD "createAt" date NOT NULL DEFAULT ('now'::text)::date`);
        await queryRunner.query(`ALTER TABLE "role" ADD "updateAt" date NOT NULL DEFAULT ('now'::text)::date`);
        await queryRunner.query(`ALTER TABLE "user" ADD "createAt" date NOT NULL DEFAULT ('now'::text)::date`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updateAt" date NOT NULL DEFAULT ('now'::text)::date`);
        await queryRunner.query(`ALTER TABLE "category" ADD "createAt" date NOT NULL DEFAULT ('now'::text)::date`);
        await queryRunner.query(`ALTER TABLE "category" ADD "updateAt" date NOT NULL DEFAULT ('now'::text)::date`);
        await queryRunner.query(`ALTER TABLE "intentory_document_items" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "inventory_document" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "product" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "purchase_orders_items" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "purchase_orders_items" ADD "createAt" date NOT NULL DEFAULT ('now'::text)::date`);
        await queryRunner.query(`ALTER TABLE "purchase_orders_items" ADD "updateAt" date NOT NULL DEFAULT ('now'::text)::date`);
        await queryRunner.query(`ALTER TABLE "purchase_orders" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "intentory_document_items" ALTER COLUMN "updateAt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "intentory_document_items" ALTER COLUMN "updateAt" SET DEFAULT ('now'::text)::date`);
        await queryRunner.query(`ALTER TABLE "inventory_document" ALTER COLUMN "updateAt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "inventory_document" ALTER COLUMN "updateAt" SET DEFAULT ('now'::text)::date`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "updateAt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "updateAt" SET DEFAULT ('now'::text)::date`);
        await queryRunner.query(`ALTER TABLE "purchase_orders" ALTER COLUMN "updateAt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "purchase_orders" ALTER COLUMN "updateAt" SET DEFAULT ('now'::text)::date`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase_orders" ALTER COLUMN "updateAt" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "purchase_orders" ALTER COLUMN "updateAt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "updateAt" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "updateAt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "inventory_document" ALTER COLUMN "updateAt" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "inventory_document" ALTER COLUMN "updateAt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "intentory_document_items" ALTER COLUMN "updateAt" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "intentory_document_items" ALTER COLUMN "updateAt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "purchase_orders" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "purchase_orders_items" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "purchase_orders_items" DROP COLUMN "createAt"`);
        await queryRunner.query(`ALTER TABLE "purchase_orders_items" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "inventory_document" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "intentory_document_items" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "createAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createAt"`);
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "createAt"`);
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "permission" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "permission" DROP COLUMN "createAt"`);
        await queryRunner.query(`ALTER TABLE "permission" DROP COLUMN "isActive"`);
    }

}
