import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto';
import { LoginUserDto } from './dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginUserDto): Promise<any> {
    return await this.authService.login(dto);
  }

  @Post('register')
  async register(@Body() dto: CreateUserDto): Promise<any> {
    return await this.authService.register(dto);
  }
}
