import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Req() req: Request, @Body() payload: any): Promise<any> {
    console.log({ payload });

    return this.userService.createUser(req, payload);
  }

  @Get()
  async getAllUsers(@Req() req: Request) {
    return this.userService.getAllUsers(req);
  }
}
