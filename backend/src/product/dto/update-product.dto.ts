import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { PRODUCT_STATUS_ENUM } from '../../util/enum';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  unit?: string;

  @IsOptional()
  @IsNumber()
  quantity?: number;

  @IsOptional()
  imageUrl?: string[];

  @IsOptional()
  @IsEnum(PRODUCT_STATUS_ENUM)
  status?: PRODUCT_STATUS_ENUM;

  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @IsOptional()
  @IsUUID()
  inventoryDocumentId?: string;
}
