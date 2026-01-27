/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PRODUCT_STATUS_ENUM } from '../../../util/enum';
import { BaseQueryDto } from 'src/common/base-query-dto';

export class ProductQueryDto extends BaseQueryDto {
  @ApiPropertyOptional({
    enum: PRODUCT_STATUS_ENUM,
    description: 'Product status',
  })
  status?: PRODUCT_STATUS_ENUM;

  @ApiPropertyOptional({
    format: 'uuid',
    description: 'Filter by category',
  })
  categoryId?: string;

  @ApiPropertyOptional({
    format: 'uuid',
    description: 'Filter by inventory document',
  })
  inventoryDocumentId?: string;

  @ApiPropertyOptional({
    enum: ['true', 'false'],
    description: 'Include cancelled products',
  })
  includeCancelled?: 'true' | 'false';
}
