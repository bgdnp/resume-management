import { Injectable } from '@nestjs/common';
import { MongoClient, Db } from 'mongodb';
import { ConfigService } from '../config/config.service';
import { Repository } from './odm/repository';
import { Document } from './odm/document';
import { DatabaseConfig } from './typings/database-config';

@Injectable()
export class MongoService {
  private url: string;
  private database: string;
  private client: MongoClient;

  constructor(private readonly config: ConfigService) {
    const db: DatabaseConfig = this.config.get<DatabaseConfig>('mongodb');

    this.url = `mongodb://${db.username}:${db.password}@${db.host}:${db.port}`;
    this.database = db.database;
  }

  async connect(): Promise<Db> {
    const client: MongoClient = new MongoClient(this.url);

    this.client = await client.connect();

    return await this.client.db(this.database);
  }

  close(): Promise<void> {
    return this.client.close();
  }

  createRepository<Doc extends Document>(schema: { new (): Doc }): Repository<Doc> {
    return new Repository<Doc>(this, schema.name);
  }
}
