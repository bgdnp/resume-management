import { Collection as MongoCollection, Cursor, ObjectId, InsertOneWriteOpResult } from 'mongodb';
import { Document } from './document';
import { MongoService } from '../mongo.service';

export class Collection<TDocument extends Document> {
  private collectionName: string;
  private collectionInstance: MongoCollection;

  constructor(private service: MongoService, schema?: { new (): TDocument }) {
    this.collectionName = schema?.name + 'Collection' || this.constructor.name;
  }

  async insert(document: Omit<TDocument, '_id'> & { _id?: any }): Promise<string> {
    const collection = await this.collection();

    const inserted: InsertOneWriteOpResult<TDocument> = await collection.insertOne(document);

    return inserted.insertedId.toHexString();
  }

  async find(filter: string | Partial<TDocument>): Promise<TDocument | Cursor<TDocument>> {
    const collection = await this.collection();

    if (typeof filter === 'string') {
      return (await collection.findOne({ _id: new ObjectId(filter) })) as TDocument;
    }

    return collection.find(filter) as Cursor<TDocument>;
  }

  async update(document: TDocument): Promise<string> {
    const { _id, ...$set } = document;
    const collection = await this.collection();

    await collection.updateOne({ _id }, { $set });

    return _id.toHexString();
  }

  async delete(document: TDocument): Promise<string> {
    const { _id } = document;
    const collection = await this.collection();

    await collection.deleteOne({ _id });

    return _id.toHexString();
  }

  protected async collection(): Promise<MongoCollection> {
    if (!this.collectionInstance) {
      const service = this.service.isConnected ? this.service : await this.service.connect();

      this.collectionInstance = service.db().collection<TDocument>(this.collectionName);
    }

    return this.collectionInstance;
  }
}
