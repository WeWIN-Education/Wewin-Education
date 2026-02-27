import { IsString, IsOptional, IsInt, IsUUID, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PRODUCT_STATUS_ENUM } from '../../../util/enum';

export class CreateProductDto {
  @ApiProperty({ example: 'P001' })
  @IsString()
  code!: string;

  @ApiProperty({ example: 'Bàn học sinh cao cấp' })
  @IsString()
  name!: string;

  @ApiPropertyOptional({ example: 'cái' })
  @IsOptional()
  @IsString()
  unit?: string;

  @ApiPropertyOptional({ example: 25 })
  @IsOptional()
  @IsInt()
  quantity?: number;

  @ApiPropertyOptional({
    example: 'Bàn học sinh cao cấp, có thể điều chỉnh độ cao',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'https://drive.google.com/product1.jpg' })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional({
    enum: PRODUCT_STATUS_ENUM,
    example: PRODUCT_STATUS_ENUM.IN_STOCK,
  })
  @IsOptional()
  @IsEnum(PRODUCT_STATUS_ENUM)
  status?: PRODUCT_STATUS_ENUM;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsUUID()
  categoryId!: string;
}
