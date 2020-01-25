import { Injectable } from '@nestjs/common';
import { User } from './documents/user';
import { MongoService } from '../mongo/mongo.service';
import { Repository } from '../mongo/odm/repository';
import { ObjectId } from 'mongodb';

@Injectable()
export class UserService {
  private repository: Repository<User>;

  constructor(mongo: MongoService) {
    this.repository = mongo.createRepository(User);
  }

  getUser(id: string): Promise<User> {
    return this.repository.findOne(id);
  }
}
