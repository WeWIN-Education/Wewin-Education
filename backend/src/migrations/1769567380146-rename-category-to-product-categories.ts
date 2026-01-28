import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameCategoryToProductCategories1769567380146 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "category"
      RENAME TO "product_categories";
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "product_categories"
      RENAME TO "category";
    `);
  }
}
