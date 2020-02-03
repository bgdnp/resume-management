import { IsEmail, IsBoolean } from 'class-validator';

export class Email {
  @IsEmail()
  email: string;

  @IsBoolean()
  default: boolean;
}
