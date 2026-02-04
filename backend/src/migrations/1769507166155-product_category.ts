import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductCategory1769507166155 implements MigrationInterface {
    name = 'ProductCategory1769507166155'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("is_active" boolean NOT NULL DEFAULT true, "create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "inventory_document" ("is_active" boolean NOT NULL DEFAULT true, "create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "note" text NOT NULL, "create_by" uuid NOT NULL, CONSTRAINT "PK_ac1031a9d1e06b867f554b593af" PRIMARY KEY ("id"))`);
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
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_0dce9bc93c2d2c399982d04bef1" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
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
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_0dce9bc93c2d2c399982d04bef1"`);
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
        await queryRunner.query(`DROP TABLE "inventory_document"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
