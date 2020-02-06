import { IsArray, ValidateNested, IsISO8601, IsAlpha, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { Address } from './subclasses/address';
import { Email } from './subclasses/email';
import { Skill } from './subclasses/skill';
import { Language } from './subclasses/language';
import { Education } from './subclasses/education';
import { Experience } from './subclasses/experience';

export abstract class UserDto {
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

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Skill)
  skills?: Skill[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Language)
  languages?: Language[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Education)
  education?: Education[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Experience)
  experience?: Experience[];
}
