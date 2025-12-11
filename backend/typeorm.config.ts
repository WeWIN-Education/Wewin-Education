import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./src/user/entities/user.entity";
import { Role } from "./src/role/entities/role.entity";

// Load .env manually
import * as dotenv from "dotenv";
dotenv.config();

export default new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: true,
  entities: [User, Role],
  migrations: ["src/migrations/*.ts"],
});
