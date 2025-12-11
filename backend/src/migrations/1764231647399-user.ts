import { MigrationInterface, QueryRunner } from "typeorm";

export class User1764231647399 implements MigrationInterface {
    name = 'User1764231647399'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "image" text`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "dob"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "dob" date`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "address" text`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "password" text`);

        // ⭐ FIX QUAN TRỌNG: update all NULL → true
        await queryRunner.query(`
            UPDATE "user" SET "isActive" = true WHERE "isActive" IS NULL
        `);

        // giờ mới được set not null
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "isActive" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "isActive" SET DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "isActive" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "isActive" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "address" character varying`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "dob"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "dob" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "image"`);
    }
}
