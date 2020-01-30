import { Controller, Get, Param, Post, Body, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { UserService } from './services/user.service';
import { User } from './documents/user';
import { CreateUserDto } from './dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  createUser(@Body() body: CreateUserDto): Promise<User> {
    return this.service.createUser(body);
  }

  @Get(':id')
  getUser(@Param('id') id: string): Promise<User> {
    return this.service.getUser(id);
  }
}
