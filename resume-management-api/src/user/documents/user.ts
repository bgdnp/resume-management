import { Document } from '../../mongo/odm/document';

export class User extends Document {
  name: string;
  email: string;
  password: string;
}
