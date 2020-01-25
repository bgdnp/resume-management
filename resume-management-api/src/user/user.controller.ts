import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './documents/user';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get(':id')
  getUser(@Param('id') id: string): Promise<User> {
    return this.service.getUser(id);
  }
}
