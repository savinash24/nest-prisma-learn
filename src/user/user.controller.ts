import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { UserDto } from './user.dto';
import { ValidateArrayPipe } from 'src/common/prisma/validators/validate-array.pipe';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  // insert one user
  @Post()
  @UsePipes(new ValidationPipe())
  async createUser(
    @Req() req: Request,
    @Body() payload: UserDto,
  ): Promise<any> {
    console.log({ payload });

    return this.userService.createUser(req, payload);
  }
  // insert multiple users
  @Post('multiple')
  @UsePipes(new ValidateArrayPipe(UserDto))
  async multipleUsers(@Req() req: Request, @Body() payload): Promise<any> {
    console.log({ payload });

    return this.userService.createMultipleUsers(req, payload);
  }

  @Get()
  async getAllUsers(@Req() req: Request): Promise<any> {
    return this.userService.getAllUsers(req);
  }
}
