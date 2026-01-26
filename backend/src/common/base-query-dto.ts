import { ApiPropertyOptional } from '@nestjs/swagger';

export class BaseQueryDto {
  @ApiPropertyOptional({ example: 1, description: 'Page number' })
  page?: number = 1;

  @ApiPropertyOptional({ example: 10, description: 'Items per page' })
  limit?: number = 10;

  @ApiPropertyOptional({
    description: 'Search by code or name',
  })
  q?: string;

  @ApiPropertyOptional({
    example: 'createAt',
    description: 'Sort field',
  })
  sortBy?: string = 'createAt';

  @ApiPropertyOptional({
    example: 'DESC',
    enum: ['ASC', 'DESC'],
    description: 'Sort direction',
  })
  order?: 'ASC' | 'DESC' = 'DESC';
}
