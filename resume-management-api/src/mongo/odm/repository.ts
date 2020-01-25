import { Db, Collection, ObjectId } from 'mongodb';
import { MongoService } from '../mongo.service';

export class Repository<Doc extends { _id: ObjectId }> {
  constructor(private mongo: MongoService, private collectionName: string) {}

  async insertOne(document: Omit<Doc, '_id'>): Promise<Doc> {
    const db: Db = await this.mongo.connect();
    const collection: Collection<Doc> = db.collection<Doc>(this.collectionName);
    const insertedDocument = (await (collection as any).insertOne(document)) as Doc;

    this.mongo.close();

    return insertedDocument;
  }

  async findOne(filter: Partial<Doc>): Promise<Doc> {
    const db: Db = await this.mongo.connect();
    const collection: Collection<Doc> = db.collection<Doc>(this.collectionName);
    const foundDocument = await collection.findOne(filter);

    this.mongo.close();

    return foundDocument;
  }
}
