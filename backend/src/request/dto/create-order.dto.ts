import { IsEnum, IsOptional, IsString } from 'class-validator';
import {
  PURCHASE_ORDERS_STATUS_ENUM,
  PURCHASE_ORDERS_TYPE_ENUM,
} from 'src/util/enum';
import { CreateOrderItemsDto } from './create-order-items';

export class CreateOrderDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  note?: string;

  @IsString({ each: true })
  imageUrl?: string[];

  @IsOptional()
  @IsEnum(PURCHASE_ORDERS_STATUS_ENUM)
  status?: PURCHASE_ORDERS_STATUS_ENUM;

  @IsOptional()
  @IsEnum(PURCHASE_ORDERS_TYPE_ENUM)
  type?: PURCHASE_ORDERS_TYPE_ENUM;

  @IsOptional()
  items: CreateOrderItemsDto[];
}
