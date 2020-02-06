import { Length, IsEmail, IsOptional, IsAlphanumeric } from 'class-validator';
import { UserDto } from './user.dto';

export class UpdateUserDto extends UserDto {
  @IsOptional()
  @Length(2, 100)
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsAlphanumeric()
  id: string;
}
