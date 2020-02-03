import { Exclude } from 'class-transformer';
import { Document } from '../../mongo/odm/document';

class Email {
  email: string;
  default: boolean;
}

class Address {
  street: string;
  city: string;
  country: string;
}

export class User extends Document {
  name: string;
  email: string;

  @Exclude()
  password: string;

  allEmails?: Email[];
  phoneNumbers?: string[];
  addresses?: Address[];
  birthday?: string;
  nationality?: string;
}
