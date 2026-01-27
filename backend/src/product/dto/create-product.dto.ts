import {
  IsString,
  IsOptional,
  IsInt,
  IsUUID,
  IsEnum,
  IsArray,
} from 'class-validator';
import { PRODUCT_STATUS_ENUM } from '../../util/enum';

export class CreateProductDto {
  @IsString()
  code: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  unit?: string;

  @IsOptional()
  @IsInt()
  quantity?: number;

  @IsOptional()
  @IsArray()
  imageUrl?: string[];

  @IsOptional()
  @IsEnum(PRODUCT_STATUS_ENUM)
  status?: PRODUCT_STATUS_ENUM;

  @IsUUID()
  categoryId: string;

  @IsUUID()
  inventoryDocumentId: string;
}
