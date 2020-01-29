import { Injectable } from '@nestjs/common';
import { User } from './documents/user';
import { MongoService } from '../mongo/mongo.service';
import { Collection } from '../mongo/odm/collection';

@Injectable()
export class UserService {
  private collection: Collection<User>;

  constructor(mongo: MongoService) {
    this.collection = mongo.collection(User);
  }

  async getUser(id: string): Promise<User> {
    return (await this.collection.find(id)) as User;
  }
}
