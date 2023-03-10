import "dotenv/config";
import path from "path";
import { DataSource } from "typeorm";

export const datasource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as unknown as number,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: [path.resolve(__dirname, "../modules/**/*.entity.{js,ts}")],
});
