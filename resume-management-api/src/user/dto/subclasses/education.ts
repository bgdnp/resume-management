import { IsNotEmpty, IsISO8601 } from 'class-validator';

export class Education {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  school: string;

  @IsISO8601()
  fromYear: number;

  @IsISO8601()
  toYear: number;
}
