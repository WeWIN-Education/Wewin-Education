import { ApiPropertyOptional } from '@nestjs/swagger';
import { PRODUCT_STATUS_ENUM } from '../../../util/enum';
import { BaseQueryDto } from 'src/common/base-query-dto';
import { IsOptional, IsString, IsEnum } from 'class-validator';

export class ProductQueryDto extends BaseQueryDto {
  @ApiPropertyOptional({
    enum: PRODUCT_STATUS_ENUM,
    description: 'Product status',
  })
  @IsOptional()
  @IsEnum(PRODUCT_STATUS_ENUM)
  status?: PRODUCT_STATUS_ENUM;

  @ApiPropertyOptional({
    format: 'uuid',
    description: 'Filter by category',
  })
  @IsOptional()
  @IsString()
  categoryId?: string;

  @ApiPropertyOptional({
    enum: ['true', 'false'],
    description: 'Include cancelled products',
  })
  @IsOptional()
  @IsEnum(['true', 'false'])
  includeCancelled?: 'true' | 'false';
}
