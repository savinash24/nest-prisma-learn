import { PrismaClient, Prisma } from '@prisma/client';
const prismaClientCache: { [key: string]: PrismaClient } = {};
export const getPrismaClient = (databaseName: string): PrismaClient => {
  const databaseUrl = `${process.env.DATABASE_URL}/${databaseName}`;

  if (!prismaClientCache[databaseUrl]) {
    const client = new PrismaClient({
      datasources: {
        db: {
          url: databaseUrl,
        },
      },
    });
    prismaClientCache[databaseUrl] = client;
  }
  return prismaClientCache[databaseUrl];
};
