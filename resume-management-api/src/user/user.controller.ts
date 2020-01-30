import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './services/user.service';
import { User } from './documents/user';
import { CreateUserDto } from './dto';
import { TransformResponseInterceptor } from '../interceptors/transform-response.interceptor';

@UseInterceptors(TransformResponseInterceptor, ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  create(@Body() body: CreateUserDto): Promise<User> {
    return this.service.create(body);
  }

  @Get()
  get(): Promise<User[]> {
    return this.service.get() as Promise<User[]>;
  }

  @Get(':idOrChunk')
  getWithParam(@Param('idOrChunk') idOrChunk: string): Promise<User | User[]> {
    return this.service.get(idOrChunk);
  }

  @Put()
  update(@Body() body: Partial<CreateUserDto> & { id: string }) {
    return this.service.update(body);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<{ deleted: boolean; id: string }> {
    return this.service.delete(id);
  }
}
