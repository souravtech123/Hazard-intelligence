import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: Number(process.env.PORT) || 5000,

  DATABASE_URL: process.env.DATABASE_URL || "postgresql://neondb_owner:npg_aiPRf0JOoZt6@ep-mute-sea-ayx1v7lc-pooler.c-5.us-east-2.aws.neon.tech/hazarddb?sslmode=require&channel_binding=require",

  NODE_ENV: process.env.NODE_ENV || "development",
};