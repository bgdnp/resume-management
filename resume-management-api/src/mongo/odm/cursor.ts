import { Cursor as MongoCursor } from 'mongodb';
import { Document } from './document';
import { TSchema } from '../typings';

export class Cursor<TDocument extends Document> {
  constructor(private cursor: MongoCursor<TDocument>, private schema: TSchema<TDocument>) {}

  async forEach(callback: (item: TDocument) => void): Promise<void> {
    return await this.cursor.forEach((item: TDocument) => {
      const document: TDocument = this.schema ? new this.schema(item) : item;

      callback(document);
    });
  }

  async toArray(): Promise<TDocument[]> {
    const items = await this.cursor.toArray();

    return items.map(item => (this.schema ? new this.schema(item) : item));
  }

  async chunk(chunk: number, limit: number = 10): Promise<TDocument[]> {
    const skip = (chunk - 1) * limit;

    return await this.skip(skip)
      .limit(limit)
      .toArray();
  }

  skip(value: number): Cursor<TDocument> {
    this.cursor = this.cursor.skip(value);

    return this;
  }

  limit(value: number): Cursor<TDocument> {
    this.cursor = this.cursor.limit(value);

    return this;
  }
}
