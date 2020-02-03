import {
  Length,
  IsEmail,
  IsArray,
  ValidateNested,
  IsISO8601,
  IsAlpha,
  IsOptional,
  IsAlphanumeric,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Address } from './subclasses/address';
import { Email } from './subclasses/email';

export class UpdateUserDto {
  @IsOptional()
  @Length(2, 100)
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsAlphanumeric()
  id: string;

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
