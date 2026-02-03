import { IsOptional, IsString } from 'class-validator';
import { BaseQueryDto } from 'src/common/base-query-dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
export class FindCategoryDto extends BaseQueryDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Category name' })
  name?: string;
}
