import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/services/user.service';
import { User } from '../user/documents/user';
import { CreateUserDto } from '../user/dto';
import { PasswordService } from '../user/services/password.service';
import { LoginUserDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
  ) {}

  private async validate(dto: LoginUserDto): Promise<User | null> {
    const user = await this.userService.getByEmail(dto.email);

    if (user && (await this.passwordService.compare(dto.password, user.password))) {
      return user;
    }

    return null;
  }

  public async login(dto: LoginUserDto) {
    const user = await this.validate(dto);

    if (!user) {
      return {
        token: null,
      };
    }

    const token = this.jwtService.sign({
      id: user.id,
      name: user.name,
    });

    return { token };
  }

  public async register(dto: CreateUserDto): Promise<User> {
    return await this.userService.create(dto);
  }
}
