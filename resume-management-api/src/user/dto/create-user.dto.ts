import { Length, IsEmail, MinLength } from 'class-validator';
import { UserDto } from './user.dto';

export class CreateUserDto extends UserDto {
  @Length(2, 100)
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}
