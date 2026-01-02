import 'reflect-metadata';
import { DataSource } from 'typeorm';

// Load .env manually
import * as dotenv from 'dotenv';
dotenv.config();

export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: true,
  entities: ['src/entities/**/*.ts'],
  migrations: ['src/migrations/*.ts'],
});
