import { Injectable, NestMiddleware, OnModuleDestroy } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { getPrismaClient } from '../common/prisma/prisma-client-factory';

@Injectable()
export class DatabaseMiddleware implements NestMiddleware, OnModuleDestroy {
  private clients: { [key: string]: PrismaClient } = {};

  use(req: Request, res: Response, next: NextFunction) {
    const databaseName = req.headers['client'] as string;
    if (!databaseName) {
      return res.status(400).json({ error: 'Database name not provided' });
    }
    const client = this.getClient(databaseName);
    (req as any).prisma = client;
    next();
  }

  getClient(databaseName: string): PrismaClient {
    if (!this.clients[databaseName]) {
      this.clients[databaseName] = getPrismaClient(databaseName);
    }
    return this.clients[databaseName];
  }

  async onModuleDestroy() {
    for (const client of Object.values(this.clients)) {
      await client.$disconnect();
    }
  }
}
