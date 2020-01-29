import { Injectable } from '@nestjs/common';
import { User } from '../documents/user';
import { MongoService } from '../../mongo/mongo.service';
import { Collection } from '../../mongo/odm/collection';
import { CreateUserDto } from '../dto';
import { PasswordService } from './password.service';

@Injectable()
export class UserService {
  private collection: Collection<User>;

  constructor(private readonly mongoService: MongoService, private readonly passwordService: PasswordService) {
    this.collection = mongoService.collection(User);
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    dto.password = await this.passwordService.hash(dto.password);

    const id: string = await this.collection.insert(dto);

    return (await this.collection.find(id)) as User;
  }

  async getUser(id: string): Promise<User> {
    return (await this.collection.find(id)) as User;
  }
}
