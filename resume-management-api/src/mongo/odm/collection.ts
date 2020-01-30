import { Collection as MongoCollection, Cursor as MongoCursor, ObjectId, InsertOneWriteOpResult } from 'mongodb';
import { Document } from './document';
import { MongoService } from '../mongo.service';
import { Cursor } from './cursor';
import { TSchema } from '../typings';

export class Collection<TDocument extends Document> {
  private collectionName: string;
  private collectionInstance: MongoCollection;

  constructor(private service: MongoService, private schema?: TSchema<TDocument>) {
    this.collectionName = schema?.name + 'Collection' || this.constructor.name;
  }

  async insert(document: Omit<TDocument, '_id' | 'id'> & { _id?: any }): Promise<string> {
    const collection = await this.collection();

    const inserted: InsertOneWriteOpResult<TDocument> = await collection.insertOne(document);

    return inserted.insertedId.toHexString();
  }

  async find(filter: string | Partial<TDocument>): Promise<TDocument | Cursor<TDocument>> {
    const collection = await this.collection();

    if (typeof filter === 'string') {
      const document: TDocument = (await collection.findOne({ _id: new ObjectId(filter) })) as TDocument;

      return this.schema ? new this.schema(document) : document;
    }

    const cursor: MongoCursor = collection.find(filter) as MongoCursor<TDocument>;

    return new Cursor<TDocument>(cursor, this.schema);
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
