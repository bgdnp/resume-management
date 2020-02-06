import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { ConfigService } from '../config/config.service';
import { ConfigModule } from '../config/config.module';

const JwtModuleFactory = (configService: ConfigService) => {
  const secret = configService.get<string>('jwt.secret');

  return JwtModule.register({ secret });
};

@Module({
  imports: [ConfigModule, UserModule, JwtModuleFactory(new ConfigService())],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
