import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/services/user.service';
import { User } from '../user/documents/user';
import { CreateUserDto } from '../user/dto';
import { PasswordService } from '../user/services/password.service';
import { LoginUserDto } from './dto';
import { ConfigService } from '../config/config.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
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

    const expiresIn = this.configService.get<number>('jwt.expire');
    const token = this.jwtService.sign(
      {
        id: user.id,
        name: user.name,
      },
      { expiresIn },
    );

    return { token, expiresIn };
  }

  public async register(dto: CreateUserDto): Promise<User> {
    return await this.userService.create(dto);
  }
}
