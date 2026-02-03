import {
  IsString,
  IsOptional,
  IsInt,
  IsUUID,
  IsEnum,
  IsArray,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PRODUCT_STATUS_ENUM } from '../../../util/enum';

export class CreateProductDto {
  @ApiProperty({ example: 'P001' })
  @IsString()
  code: string;

  @ApiProperty({ example: 'Bàn học sinh cao cấp' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 'cái' })
  @IsOptional()
  @IsString()
  unit?: string;

  @ApiPropertyOptional({ example: 25 })
  @IsOptional()
  @IsInt()
  quantity?: number;

  @ApiPropertyOptional({
    example: ['https://cdn.wewin.edu.vn/product1.jpg'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  imageUrl?: string[];

  @ApiPropertyOptional({
    enum: PRODUCT_STATUS_ENUM,
    example: PRODUCT_STATUS_ENUM.IN_STOCK,
  })
  @IsOptional()
  @IsEnum(PRODUCT_STATUS_ENUM)
  status?: PRODUCT_STATUS_ENUM;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsUUID()
  categoryId: string;

  @ApiProperty({ example: '6ba7b810-9dad-11d1-80b4-00c04fd430c8' })
  @IsUUID()
  inventoryDocumentId: string;
}
