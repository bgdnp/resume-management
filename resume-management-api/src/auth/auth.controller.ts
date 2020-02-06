import { Controller, Post, Body, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto';
import { LoginUserDto } from './dto';
import { User } from '../user/documents/user';
import { TransformResponseInterceptor } from '../interceptors/transform-response.interceptor';

@UseInterceptors(TransformResponseInterceptor, ClassSerializerInterceptor)
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() dto: LoginUserDto): Promise<{ token: string }> {
    return this.authService.login(dto);
  }

  @Post('register')
  register(@Body() dto: CreateUserDto): Promise<User> {
    return this.authService.register(dto);
  }
}
