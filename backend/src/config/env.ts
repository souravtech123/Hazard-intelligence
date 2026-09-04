import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: Number(process.env.PORT) || 5000,

  DATABASE_URL: process.env.DATABASE_URL || "postgresql://sourav:sourav2026@localhost:5432/sih_db",

  NODE_ENV: process.env.NODE_ENV || "development",
};