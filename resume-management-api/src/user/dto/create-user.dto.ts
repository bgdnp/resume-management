import { Length, IsEmail, MinLength, IsArray, ValidateNested, IsISO8601, IsAlpha, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { Address } from './subclasses/address';
import { Email } from './subclasses/email';

export class CreateUserDto {
  @Length(2, 100)
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Email)
  allEmails?: Email[];

  @IsOptional()
  @IsArray()
  @Type(() => String)
  phoneNumbers?: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Address)
  addresses?: Address[];

  @IsOptional()
  @IsISO8601()
  birthday?: string;

  @IsOptional()
  @IsAlpha()
  nationality?: string;
}
