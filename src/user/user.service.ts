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
    // console.log({ query });

    return await request.prisma.user.findMany();
  }
}
