import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data) {
    return this.prisma.user.create({
      data,
    });
    // return [];
  }
  async getAllUsers() {
    const query = this.prisma.user.findMany();
    // console.log({ query });

    return await query;
  }
}
