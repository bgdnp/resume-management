import { Injectable } from '@nestjs/common';
import { User } from '../documents/user';
import { MongoService } from '../../mongo/mongo.service';
import { Collection } from '../../mongo/odm/collection';
import { CreateUserDto } from '../dto';
import { PasswordService } from './password.service';
import { Cursor } from '../../mongo/odm/cursor';

@Injectable()
export class UserService {
  private collection: Collection<User>;

  constructor(private readonly mongoService: MongoService, private readonly passwordService: PasswordService) {
    this.collection = mongoService.collection(User);
  }

  async create(dto: CreateUserDto): Promise<User> {
    dto.password = await this.passwordService.hash(dto.password);

    const id: string = await this.collection.insert(dto);

    return (await this.collection.find(id)) as User;
  }

  async get(idOrChunk?: string): Promise<User | User[]> {
    if (!idOrChunk || Number.isInteger(Number(idOrChunk))) {
      return await this.getMany(Number(idOrChunk));
    }

    return await this.getOne(idOrChunk);
  }

  private async getOne(id: string): Promise<User> {
    return (await this.collection.find(id)) as User;
  }

  private async getMany(chunk?: number): Promise<User[]> {
    const cursor = (await this.collection.find({})) as Cursor<User>;

    return await cursor.chunk(chunk || 1);
  }

  async update(dto: Partial<CreateUserDto> & { id: string }): Promise<User> {
    const id: string = await this.collection.update(dto);

    return (await this.collection.find(id)) as User;
  }
}
