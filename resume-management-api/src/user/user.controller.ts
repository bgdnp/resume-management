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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './services/user.service';
import { User } from './documents/user';
import { CreateUserDto, UpdateUserDto } from './dto';
import { TransformResponseInterceptor } from '../interceptors/transform-response.interceptor';

@UseInterceptors(TransformResponseInterceptor, ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() body: CreateUserDto): Promise<User> {
    return this.service.create(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  get(): Promise<User[]> {
    return this.service.get() as Promise<User[]>;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':idOrChunk')
  getWithParam(@Param('idOrChunk') idOrChunk: string): Promise<User | User[]> {
    return this.service.get(idOrChunk);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put()
  update(@Body() body: UpdateUserDto) {
    return this.service.update(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param('id') id: string): Promise<{ deleted: boolean; id: string }> {
    return this.service.delete(id);
  }
}
