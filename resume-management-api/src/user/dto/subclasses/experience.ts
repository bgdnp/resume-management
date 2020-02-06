import { IsNotEmpty, IsISO8601, IsOptional } from 'class-validator';

export class Experience {
  @IsNotEmpty()
  position: string;

  @IsNotEmpty()
  company: string;

  @IsISO8601()
  fromDate: string;

  @IsOptional()
  @IsISO8601()
  toDate?: string;

  @IsOptional()
  description?: string;
}
