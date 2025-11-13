import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const isTest = process.env.NODE_ENV === "test";

const sequelize = isTest
  ? new Sequelize("sqlite::memory:", { logging: false })
  : new Sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      logging: false,
      dialectOptions: { ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false }
    });

export default sequelize;
