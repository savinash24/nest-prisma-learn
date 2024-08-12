import { Injectable } from '@nestjs/common';
// import { PrismaService } from '../common/prisma/prisma.service';
@Injectable()
export class UserService {
  constructor() {}

  async createUser(request: any, data) {
    return request.prisma.user.create({
      data,
    });
    // return [];
  }
  async getAllUsers(request: any) {
    return await request.prisma.user.findMany();
  }

  async createMultipleUsers(request: any, data) {
    return await request.prisma.user.createMany({
      data: data,
      skipDuplicates: true,
    });
  }
}
