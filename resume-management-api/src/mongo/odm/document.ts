import { ObjectId } from 'mongodb';
import { Exclude } from 'class-transformer';

export class Document {
  @Exclude()
  _id: ObjectId;

  id: string;

  constructor(doc?: Document) {
    doc.id = doc._id.toHexString();

    Object.assign(this, doc);
  }
}
