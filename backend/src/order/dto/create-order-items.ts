import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderItemsDto {
  @IsString()
  productId: string;

  @IsOptional()
  @IsNumber()
  quantityRequest?: number;

  @IsOptional()
  @IsString()
  unitPriceRequest?: string;

  @IsOptional()
  @IsNumber()
  vatPriceRequest?: number;

  @IsOptional()
  @IsNumber()
  totalPriceRequest?: bigint;

  @IsOptional()
  @IsString()
  noteRequest?: string;

  @IsOptional()
  @IsNumber()
  quantityOrder?: number;

  @IsOptional()
  @IsString()
  unitPriceOrder?: string;

  @IsOptional()
  @IsNumber()
  vatPriceOrder?: number;

  @IsOptional()
  @IsNumber()
  totalPriceOrder?: bigint;

  @IsOptional()
  @IsString()
  noteOrder?: string;
}
