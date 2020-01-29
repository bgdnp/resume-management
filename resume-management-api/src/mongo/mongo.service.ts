import { MongoClient, MongoClientOptions, Db } from 'mongodb';
import { Document } from './odm/document';
import { Collection } from './odm/collection';
import { TMongoConfig } from './typings';
import { ConfigService } from '../config/config.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MongoService {
  public isConnected: boolean = false;
  private config: TMongoConfig;
  private client: MongoClient;
  private database: Db;

  constructor(private configService: ConfigService) {
    this.config = this.configService.get<TMongoConfig>('mongodb');

    const { host, port, user, password } = this.config;

    this.client = new MongoClient(`mongodb://${host}:${port}`, {
      auth: { user, password },
      useUnifiedTopology: true,
    });
  }

  async connect(): Promise<MongoService> {
    await this.client.connect();
    this.database = this.client.db(this.config.database);
    this.isConnected = true;

    return this;
  }

  async disconnect(): Promise<MongoService> {
    await this.client.close();
    this.db = null;
    this.isConnected = false;

    return this;
  }

  db(): Db {
    return this.database;
  }

  collection<TDocument extends Document>(document: { new (): TDocument }): Collection<TDocument> {
    return new Collection<TDocument>(this, document);
  }
}
