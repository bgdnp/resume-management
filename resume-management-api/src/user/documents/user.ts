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

class Skill {
  skill: string;
  level: number;
  description?: string;
}

class Language {
  language: string;
  level?: string;
  description?: string;
}

class Education {
  title: string;
  school: string;
  fromYear: number;
  toYear: number;
}

class Experience {
  position: string;
  company: string;
  fromDate: string;
  toDate?: string;
  description?: string;
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
  skills?: Skill[];
  languages?: Language[];
  education?: Education[];
  experience?: Experience[];
}
