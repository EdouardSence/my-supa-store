import "dotenv/config";
import { PrismaClient } from "@/app/generated/prisma";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

type GlobalPrisma = {
  prisma?: PrismaClient;
};

const globalForPrisma = globalThis as GlobalPrisma;

function createPrisma() {
  const url = process.env.DATABASE_URL ?? "file:./dev.db";
  const adapter = new PrismaBetterSqlite3({ url });
  return new PrismaClient({ adapter });
}

function hasUserDelegate(client: PrismaClient): boolean {
  return "user" in client;
}

const existing = globalForPrisma.prisma;

export const prisma: PrismaClient =
  existing && hasUserDelegate(existing) ? existing : createPrisma();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
