import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeInventoryFlow1770187081844 implements MigrationInterface {
    name = 'ChangeInventoryFlow1770187081844'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."inventory_movement_type_enum" AS ENUM('in', 'out')`);
        await queryRunner.query(`CREATE TABLE "inventory_movement" ("is_active" boolean NOT NULL DEFAULT true, "create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "public"."inventory_movement_type_enum" NOT NULL, "note" text NOT NULL, "create_by" uuid NOT NULL, "inventory_request_id" uuid, CONSTRAINT "PK_e17362693c889da517444ad8fb5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "inventory_movement_item" ("is_active" boolean NOT NULL DEFAULT true, "create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "inventory_id" uuid NOT NULL, "product_id" uuid NOT NULL, "quantity" integer, "note" text, CONSTRAINT "PK_f927cde80cf2fe0cb852f577230" PRIMARY KEY ("inventory_id", "product_id"))`);
        await queryRunner.query(`CREATE TABLE "inventory_request_item" ("inventory_request_id" uuid NOT NULL, "product_id" uuid NOT NULL, "quantity_request" integer, "unit_price_request" text, "vat_price_request" double precision, "total_price_request" bigint, "note_request" text, "quantity_order" integer, "unit_price_order" text, "vat_price_order" double precision, "total_price_order" bigint, "note_order" text, CONSTRAINT "PK_bf92621901cadaf3f998a81a30d" PRIMARY KEY ("inventory_request_id", "product_id"))`);
        await queryRunner.query(`CREATE TYPE "public"."inventory_request_status_enum" AS ENUM('draft', 'requested', 'approved', 'order_requested', 'order_approved', 'cancelled', 'success')`);
        await queryRunner.query(`CREATE TYPE "public"."inventory_request_type_enum" AS ENUM('in', 'out')`);
        await queryRunner.query(`CREATE TABLE "inventory_request" ("is_active" boolean NOT NULL DEFAULT true, "create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" text NOT NULL, "name" text NOT NULL, "note" text, "image_url" text, "status" "public"."inventory_request_status_enum", "type" "public"."inventory_request_type_enum", "create_by" uuid, CONSTRAINT "PK_660f363e25335e3a88399c2337d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."books_status_enum" AS ENUM('active', 'inactive')`);
        await queryRunner.query(`CREATE TABLE "books" ("is_active" boolean NOT NULL DEFAULT true, "create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "status" "public"."books_status_enum" NOT NULL DEFAULT 'active', "imgUrl" character varying NOT NULL, "description" text, "gameUrl" character varying, CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."lesson_blocks_type_enum" AS ENUM('list', 'paragraph', 'audio', 'homework')`);
        await queryRunner.query(`CREATE TABLE "lesson_blocks" ("is_active" boolean NOT NULL DEFAULT true, "create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "learningNodeId" character varying NOT NULL, "title" character varying NOT NULL, "type" "public"."lesson_blocks_type_enum" NOT NULL, "order" integer NOT NULL DEFAULT '0', "content" text NOT NULL, "audioUrl" character varying, "learning_node_id" uuid, CONSTRAINT "PK_d005980e9101826f9a92fffa4ae" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3ab9b469471d897d800c9cf152" ON "lesson_blocks" ("learningNodeId") `);
        await queryRunner.query(`CREATE TYPE "public"."learning_nodes_type_enum" AS ENUM('week', 'section')`);
        await queryRunner.query(`CREATE TABLE "learning_nodes" ("is_active" boolean NOT NULL DEFAULT true, "create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "projectId" character varying NOT NULL, "parentId" character varying, "title" character varying NOT NULL, "description" text, "type" "public"."learning_nodes_type_enum" NOT NULL, "order" integer NOT NULL DEFAULT '0', "project_id" uuid, "parent_id" uuid, CONSTRAINT "PK_0af22b3300706a2411cd586944d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f6b504e7dc9e8a6b112e43e12b" ON "learning_nodes" ("projectId") `);
        await queryRunner.query(`CREATE INDEX "IDX_89311810f8e2bd7b99f40cae65" ON "learning_nodes" ("parentId") `);
        await queryRunner.query(`CREATE TABLE "projects" ("is_active" boolean NOT NULL DEFAULT true, "create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "bookId" character varying NOT NULL, "name" character varying NOT NULL, "description" text NOT NULL, "order" integer NOT NULL DEFAULT '0', "book_id" uuid, CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_15a81989489f5895b74d023707" ON "projects" ("bookId") `);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "inventory_document_id"`);
        await queryRunner.query(`ALTER TABLE "role" ADD "is_active" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "role" ADD "create_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "role" ADD "update_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "role" ADD "delete_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "user" ADD "is_active" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "user" ADD "create_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "update_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "delete_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "inventory_movement" ADD CONSTRAINT "FK_c43fdd65dd22e4874d3458c938f" FOREIGN KEY ("inventory_request_id") REFERENCES "inventory_request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory_movement_item" ADD CONSTRAINT "FK_6ce27b767f668d78459a5d986c5" FOREIGN KEY ("inventory_id") REFERENCES "inventory_movement"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory_movement_item" ADD CONSTRAINT "FK_b866735f579da0369e232a2e30a" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory_request_item" ADD CONSTRAINT "FK_1f7645d23aea8b17cf0c4c046a6" FOREIGN KEY ("inventory_request_id") REFERENCES "inventory_request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory_request_item" ADD CONSTRAINT "FK_77e40f16256f08d8382308d2af9" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory_request" ADD CONSTRAINT "FK_e5a89ab941c29284422d2b117fb" FOREIGN KEY ("create_by") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lesson_blocks" ADD CONSTRAINT "FK_6f6346a6b0c8f7b60684467cd35" FOREIGN KEY ("learning_node_id") REFERENCES "learning_nodes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "learning_nodes" ADD CONSTRAINT "FK_851fe31d52dd53519f42343b838" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "learning_nodes" ADD CONSTRAINT "FK_82de53d73c9871ca492cbe6008c" FOREIGN KEY ("parent_id") REFERENCES "learning_nodes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_e36d19b25a116da0fc9e9b45cc6" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_e36d19b25a116da0fc9e9b45cc6"`);
        await queryRunner.query(`ALTER TABLE "learning_nodes" DROP CONSTRAINT "FK_82de53d73c9871ca492cbe6008c"`);
        await queryRunner.query(`ALTER TABLE "learning_nodes" DROP CONSTRAINT "FK_851fe31d52dd53519f42343b838"`);
        await queryRunner.query(`ALTER TABLE "lesson_blocks" DROP CONSTRAINT "FK_6f6346a6b0c8f7b60684467cd35"`);
        await queryRunner.query(`ALTER TABLE "inventory_request" DROP CONSTRAINT "FK_e5a89ab941c29284422d2b117fb"`);
        await queryRunner.query(`ALTER TABLE "inventory_request_item" DROP CONSTRAINT "FK_77e40f16256f08d8382308d2af9"`);
        await queryRunner.query(`ALTER TABLE "inventory_request_item" DROP CONSTRAINT "FK_1f7645d23aea8b17cf0c4c046a6"`);
        await queryRunner.query(`ALTER TABLE "inventory_movement_item" DROP CONSTRAINT "FK_b866735f579da0369e232a2e30a"`);
        await queryRunner.query(`ALTER TABLE "inventory_movement_item" DROP CONSTRAINT "FK_6ce27b767f668d78459a5d986c5"`);
        await queryRunner.query(`ALTER TABLE "inventory_movement" DROP CONSTRAINT "FK_c43fdd65dd22e4874d3458c938f"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "delete_at"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "update_at"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "create_at"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "is_active"`);
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "delete_at"`);
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "update_at"`);
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "create_at"`);
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "is_active"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "inventory_document_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`DROP INDEX "public"."IDX_15a81989489f5895b74d023707"`);
        await queryRunner.query(`DROP TABLE "projects"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_89311810f8e2bd7b99f40cae65"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f6b504e7dc9e8a6b112e43e12b"`);
        await queryRunner.query(`DROP TABLE "learning_nodes"`);
        await queryRunner.query(`DROP TYPE "public"."learning_nodes_type_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3ab9b469471d897d800c9cf152"`);
        await queryRunner.query(`DROP TABLE "lesson_blocks"`);
        await queryRunner.query(`DROP TYPE "public"."lesson_blocks_type_enum"`);
        await queryRunner.query(`DROP TABLE "books"`);
        await queryRunner.query(`DROP TYPE "public"."books_status_enum"`);
        await queryRunner.query(`DROP TABLE "inventory_request"`);
        await queryRunner.query(`DROP TYPE "public"."inventory_request_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."inventory_request_status_enum"`);
        await queryRunner.query(`DROP TABLE "inventory_request_item"`);
        await queryRunner.query(`DROP TABLE "inventory_movement_item"`);
        await queryRunner.query(`DROP TABLE "inventory_movement"`);
        await queryRunner.query(`DROP TYPE "public"."inventory_movement_type_enum"`);
    }

}
