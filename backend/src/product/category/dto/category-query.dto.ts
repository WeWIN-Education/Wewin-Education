import { ApiPropertyOptional } from '@nestjs/swagger';
import { BaseQueryDto } from 'src/common/base-query-dto';

export class CategoryQueryDto extends BaseQueryDto {
  @ApiPropertyOptional({
    description: 'Search by category name',
    example: 'Stationery',
  })
  search?: string;
}
