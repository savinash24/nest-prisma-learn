import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      log: [{ emit: 'event', level: 'query' }],
    });

    this.$use(async (params: any, next) => {
      const before = Date.now();
      const result = await next(params);
      const after = Date.now();
      const duration = after - before;
      console.log('Query:', params.query);
      console.log('Params:', params.args);
      console.log('Duration:', duration, 'ms');

      return result;
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      console.log('Prisma Client connected');
    } catch (error) {
      console.error('Error connecting Prisma Client:', error);
    }
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
      console.log('Prisma Client disconnected');
    } catch (error) {
      console.error('Error disconnecting Prisma Client:', error);
    }
  }
}
