import { IsNotEmpty, IsOptional } from 'class-validator';

export class Language {
  @IsNotEmpty()
  language: string;

  @IsOptional()
  level?: string;

  @IsOptional()
  description?: string;
}
