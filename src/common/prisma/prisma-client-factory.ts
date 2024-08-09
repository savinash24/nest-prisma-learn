import { PrismaClient } from '@prisma/client';

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
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'event', level: 'info' },
        { emit: 'event', level: 'warn' },
        { emit: 'event', level: 'error' },
      ],
    });

    client.$on('query', (e) => {
      console.log(`Query: ${e.query}`);
      console.log(`Params: ${e.params}`);
      console.log(`Duration: ${e.duration}ms`);
    });

    client.$on('info', (e) => {
      console.log(`Info: ${e.message}`);
    });

    client.$on('warn', (e) => {
      console.log(`Warn: ${e.message}`);
    });

    client.$on('error', (e) => {
      console.log(`Error: ${e.message}`);
    });

    prismaClientCache[databaseUrl] = client;
  }
  return prismaClientCache[databaseUrl];
};
