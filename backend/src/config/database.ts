import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const connectDatabase = async (): Promise<void> => {
  try {
    if (!process.env.DATABASE_URL) {
      console.warn("⚠️  DATABASE_URL is not configured. Running without active database connection.");
      return;
    }
    await prisma.$connect();
    console.log("✅ Connected to PostgreSQL via Prisma");
    
  } catch (error) {
    console.warn("⚠️  Failed to connect to database:", error instanceof Error ? error.message : error);
    console.warn("⚠️  Continuing server startup in offline DB mode...");
  }
};
