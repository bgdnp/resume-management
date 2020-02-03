import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './services/user.service';
import { MongoModule } from '../mongo/mongo.module';
import { PasswordService } from './services/password.service';

@Module({
  imports: [MongoModule],
  controllers: [UserController],
  providers: [UserService, PasswordService],
  exports: [UserService, PasswordService],
})
export class UserModule {}
