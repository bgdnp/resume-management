import { Controller, Get, Param, Post, Body, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { UserService } from './services/user.service';
import { User } from './documents/user';
import { CreateUserDto } from './dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  create(@Body() body: CreateUserDto): Promise<User> {
    return this.service.create(body);
  }

  @Get()
  async getMany(): Promise<User[]> {
    return (await this.service.get()) as User[];
  }

  @Get(':idOrChunk')
  get(@Param('idOrChunk') idOrChunk?: string): Promise<User | User[]> {
    return this.service.get(idOrChunk);
  }
}
