import { IsNotEmpty, Min, Max, IsOptional } from 'class-validator';

export class Skill {
  @IsNotEmpty()
  skill: string;

  @IsNotEmpty()
  @Min(0)
  @Max(100)
  level: number;

  @IsOptional()
  description?: string;
}
