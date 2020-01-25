import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { MongoService } from './mongo.service';

@Module({
  imports: [ConfigModule],
  providers: [MongoService],
  exports: [MongoService],
})
export class MongoModule {}
