import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  IsIn,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PRODUCT_STATUS_ENUM } from '../../../util/enum';

export class ProductQueryDto {
  // search theo code/name (contains, case-insensitive)
  @IsOptional()
  @IsString()
  q?: string;

  // filter theo status
  @IsOptional()
  @IsEnum(PRODUCT_STATUS_ENUM)
  status?: PRODUCT_STATUS_ENUM;

  // filter theo category
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  // filter theo inventoryDocument
  @IsOptional()
  @IsUUID()
  inventoryDocumentId?: string;

  // (tuỳ chọn) include cancelled hay không
  // - mặc định: không trả cancelled
  // ✅ QUERY BOOLEAN → STRING
  @IsOptional()
  @IsIn(['true', 'false'])
  includeCancelled?: string;

  // paging
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;
}
