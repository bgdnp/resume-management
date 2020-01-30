import { Length, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @Length(2, 100)
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}
