import { IsOptional, IsString, IsBooleanString } from 'class-validator';

export class FindCategoryDto {
  @IsString()
  @IsOptional()
  q?: string;

  // query ?active=true|false
  @IsBooleanString()
  @IsOptional()
  active?: string;
}
