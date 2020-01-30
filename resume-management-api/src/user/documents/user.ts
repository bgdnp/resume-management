import { Exclude } from 'class-transformer';
import { Document } from '../../mongo/odm/document';

export class User extends Document {
  name: string;
  email: string;

  @Exclude()
  password: string;
}
