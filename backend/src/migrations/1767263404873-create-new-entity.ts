import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateNewEntity1767263404873 implements MigrationInterface {
    name = 'CreateNewEntity1767263404873'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "permission" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "UQ_240853a0c3353c25fb12434ad33" UNIQUE ("name"), CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "intentory_document_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer, "createAt" date NOT NULL DEFAULT ('now'::text)::date, "updateAt" date, CONSTRAINT "PK_e2f8e02593cbf4e81a807dbe9e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."purchase_orders_status_enum" AS ENUM('draft', 'requested', 'approved', 'order_requested', 'order_approved', 'cancelled', 'success')`);
        await queryRunner.query(`CREATE TYPE "public"."purchase_orders_type_enum" AS ENUM('in', 'out')`);
        await queryRunner.query(`CREATE TABLE "purchase_orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" text NOT NULL, "name" text NOT NULL, "note" text, "imageUrl" text, "status" "public"."purchase_orders_status_enum", "type" "public"."purchase_orders_type_enum", "createAt" date NOT NULL DEFAULT ('now'::text)::date, "updateAt" date, "createById" uuid, CONSTRAINT "PK_05148947415204a897e8beb2553" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "purchase_orders_items" ("purchaseOrderId" uuid NOT NULL, "productId" uuid NOT NULL, "quantityRequest" integer NOT NULL, "unitPriceRequest" text NOT NULL, "vatPriceRequest" double precision NOT NULL, "totalPriceRequest" bigint NOT NULL, "noteRequest" text, "quantityOrder" integer NOT NULL, "unitPriceOrder" text NOT NULL, "vatPriceOrder" double precision NOT NULL, "totalPriceOrder" bigint NOT NULL, "noteOrder" text, CONSTRAINT "PK_df8c60c5aa5f53c2d4167e102e4" PRIMARY KEY ("purchaseOrderId", "productId"))`);
        await queryRunner.query(`CREATE TABLE "inventory_document" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "note" text NOT NULL, "createAt" date NOT NULL DEFAULT ('now'::text)::date, "updateAt" date, "createById" uuid, CONSTRAINT "PK_ac1031a9d1e06b867f554b593af" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."product_status_enum" AS ENUM('in_stock', 'low_stock', 'out_of_stock', 'cancelled')`);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" text NOT NULL, "name" text NOT NULL, "unit" text, "quantity" integer, "imageUrl" text, "status" "public"."product_status_enum", "createAt" date NOT NULL DEFAULT ('now'::text)::date, "updateAt" date, "categoryId" uuid, "inventoryDocumentId" uuid, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role_permissions_permission" ("roleId" uuid NOT NULL, "permissionId" uuid NOT NULL, CONSTRAINT "PK_b817d7eca3b85f22130861259dd" PRIMARY KEY ("roleId", "permissionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b36cb2e04bc353ca4ede00d87b" ON "role_permissions_permission" ("roleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_bfbc9e263d4cea6d7a8c9eb3ad" ON "role_permissions_permission" ("permissionId") `);
        await queryRunner.query(`ALTER TABLE "user" ADD "refreshToken" text`);
        await queryRunner.query(`ALTER TABLE "purchase_orders" ADD CONSTRAINT "FK_64e82c186bcb513ca037fc1fff3" FOREIGN KEY ("createById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase_orders_items" ADD CONSTRAINT "FK_87dad9c866eb31032125a197870" FOREIGN KEY ("purchaseOrderId") REFERENCES "purchase_orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase_orders_items" ADD CONSTRAINT "FK_f336388ee71a47d6ffda31d7633" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory_document" ADD CONSTRAINT "FK_3b1d80261a1083b31ed62dd396c" FOREIGN KEY ("createById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_d7265615ebc7862f98a73250b8f" FOREIGN KEY ("inventoryDocumentId") REFERENCES "inventory_document"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role_permissions_permission" ADD CONSTRAINT "FK_b36cb2e04bc353ca4ede00d87b9" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "role_permissions_permission" ADD CONSTRAINT "FK_bfbc9e263d4cea6d7a8c9eb3ad2" FOREIGN KEY ("permissionId") REFERENCES "permission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role_permissions_permission" DROP CONSTRAINT "FK_bfbc9e263d4cea6d7a8c9eb3ad2"`);
        await queryRunner.query(`ALTER TABLE "role_permissions_permission" DROP CONSTRAINT "FK_b36cb2e04bc353ca4ede00d87b9"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_d7265615ebc7862f98a73250b8f"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812"`);
        await queryRunner.query(`ALTER TABLE "inventory_document" DROP CONSTRAINT "FK_3b1d80261a1083b31ed62dd396c"`);
        await queryRunner.query(`ALTER TABLE "purchase_orders_items" DROP CONSTRAINT "FK_f336388ee71a47d6ffda31d7633"`);
        await queryRunner.query(`ALTER TABLE "purchase_orders_items" DROP CONSTRAINT "FK_87dad9c866eb31032125a197870"`);
        await queryRunner.query(`ALTER TABLE "purchase_orders" DROP CONSTRAINT "FK_64e82c186bcb513ca037fc1fff3"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "refreshToken"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bfbc9e263d4cea6d7a8c9eb3ad"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b36cb2e04bc353ca4ede00d87b"`);
        await queryRunner.query(`DROP TABLE "role_permissions_permission"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TYPE "public"."product_status_enum"`);
        await queryRunner.query(`DROP TABLE "inventory_document"`);
        await queryRunner.query(`DROP TABLE "purchase_orders_items"`);
        await queryRunner.query(`DROP TABLE "purchase_orders"`);
        await queryRunner.query(`DROP TYPE "public"."purchase_orders_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."purchase_orders_status_enum"`);
        await queryRunner.query(`DROP TABLE "intentory_document_items"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "permission"`);
    }

}
