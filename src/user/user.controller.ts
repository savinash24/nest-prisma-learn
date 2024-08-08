import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() payload: any): Promise<any> {
    console.log({ payload });

    return this.userService.createUser(payload);
  }

  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }
}
